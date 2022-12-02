import { auth } from '@app/common/proto/auth';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { JwtService } from '@nestjs/jwt';
import { BaseRpcExceptionFilter, RpcException } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../models/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { status } from '@grpc/grpc-js';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  private async doesUserExist(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    return !!user;
  }

  async createAccount(data: auth.RegisterRequest): Promise<string> {
    const user = await this.registerAccount(data);
    return this.generateToken(user);
  }

  async registerAccount(user: auth.RegisterRequest): Promise<UserEntity> {
    const { name, email, password } = user;

    if (await this.doesUserExist(email)) {
      throw new RpcException({
        code: status.ALREADY_EXISTS,
        message: 'Email is already registered'
      });
    }

    const hashedPassword = await this.hashPassword(password);
    const userEntity = await this.userRepository.save({
      name,
      email,
      password: hashedPassword,
    });

    return userEntity;
  }

  async validateUser(email: string, password: string): Promise<UserEntity> {
    const userEntity = await this.userRepository.findOne({ where: { email } });
    if (!userEntity) {
      throw new HttpException(
        { status: HttpStatus.FORBIDDEN, error: 'Invalid Credentials' },
        HttpStatus.FORBIDDEN,
      );
    }

    const passwordMatch = await bcrypt.compare(password, userEntity.password);
    if (!passwordMatch) {
      throw new HttpException(
        { status: HttpStatus.FORBIDDEN, error: 'Invalid Credentials' },
        HttpStatus.FORBIDDEN,
      );
    }

    return userEntity;
  }

  async login(user: auth.LoginRequest): Promise<string> {
    const { email, password } = user;
    const userEntity = await this.validateUser(email, password);

    return this.generateToken(userEntity);
  }

  async generateToken(userEntity: UserEntity): Promise<string> {
    delete userEntity.password;
    return this.jwtService.signAsync({ userEntity });
  }
}
