import { auth } from '@app/common/proto/auth';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../models/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { status } from '@grpc/grpc-js';
import { ConfigService } from '@nestjs/config';
import { ObjectID } from 'mongodb';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Create new User Account
   * @param data
   * @returns RegisterResponse
   */
  async createAccount(
    payload: auth.RegisterRequest,
  ): Promise<auth.RegisterResponse> {
    const { name, email, password } = payload;

    if (await this.doesUserExist(email)) {
      throw new RpcException({
        code: status.ALREADY_EXISTS,
        message: 'Email is already registered',
      });
    }

    const hashedPassword = await this.hashPassword(password);
    const userEntity = await this.userRepository.save({
      name,
      email,
      password: hashedPassword,
    });

    return this.generateToken(userEntity);
  }

  /**
   * Login user with email and password
   * @param payload
   * @returns
   */
  async login(payload: auth.LoginRequest): Promise<auth.LoginResponse> {
    const { email, password } = payload;

    const userEntity = await this.userRepository.findOne({ where: { email } });
    if (!userEntity) {
      throw new RpcException({
        code: status.UNAUTHENTICATED,
        message: 'Invalid Credentials',
      });
    }

    const passwordMatch = await bcrypt.compare(password, userEntity.password);
    if (!passwordMatch) {
      throw new RpcException({
        code: status.UNAUTHENTICATED,
        message: 'Invalid Credentials',
      });
    }

    return this.generateToken(userEntity);
  }

  /**
   * Helper function to hash password
   * @param password
   * @returns hashed password
   */
  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  /**
   * Helper function to verify is email is already registered
   * @param email
   * @returns if user exits
   */
  async doesUserExist(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    return !!user;
  }

  /**
   * Helper function to get user by ID
   * @param id
   * @returns user
   */
  async getUser(id: string): Promise<UserEntity | null> {
    const _id = new ObjectID(id);
    return this.userRepository.findOneBy({ _id });
  }

  /**
   * Generate Access and Refresh tokens
   * @param userEntity
   * @returns
   */
  async generateToken(userEntity: UserEntity): Promise<auth.RegisterResponse> {
    delete userEntity.password;
    const accessToken = await this.jwtService.signAsync(
      { userEntity },
      {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRATION'),
      },
    );
    const refreshToken = await this.jwtService.signAsync(
      { userEntity },
      {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION'),
      },
    );
    return {
      accessToken,
      refreshToken,
    };
  }
}
