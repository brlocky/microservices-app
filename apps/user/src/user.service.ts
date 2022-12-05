import { user } from '@app/common/proto/user';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ObjectID } from 'mongodb';
import { UserRepository } from './user.repository';
import { RpcAlreadyExistsException } from '@app/common';
import { UserEntity } from './schema/user.entity';
import { RpcInvalidCredentialsException } from '@app/common/exceptions/rpc-invalid-credentials.exception';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * Create new User Account
   * @param payload
   * @returns RegisterResponse
   */
  async register(
    payload: user.RegisterRequest,
  ): Promise<user.RegisterResponse> {
    const { name, email, password } = payload;

    if (await this.doesUserExist(email)) {
      throw new RpcAlreadyExistsException();
    }

    const hashedPassword = await this.hashPassword(password);
    return {
      user: await this.userRepository.save({
        name,
        email,
        password: hashedPassword,
      }),
    };
  }

  /**
   * Login with email and password
   * @param payload
   * @returns User
   */
  async login(payload: user.LoginRequest): Promise<user.LoginResponse> {
    const { email, password } = payload;
    const userEntity = await this.userRepository.findOne({ where: { email } });
    if (!userEntity) {
      throw new RpcInvalidCredentialsException();
    }

    const passwordMatch = await bcrypt.compare(password, userEntity.password);
    if (!passwordMatch) {
      throw new RpcInvalidCredentialsException();
    }

    return {
      user: {
        ...userEntity,
        id: userEntity._id,
      },
    };
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
}
