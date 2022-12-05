import { user } from '@app/common/proto/user';
import { Body, Post, Request, UseGuards } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthGrpcService } from '../modules/auth-grpc/auth-grpc.service';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: AuthGrpcService,
    private readonly authService: AuthService,
    ) {}

  @Post('register')
  async registerUser(
    @Body() payload: user.RegisterRequest,
  ): Promise<user.RegisterResponse> {
    return this.userService.registerUser(payload);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.generateToken(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('test')
  async test() {
    return 'Access Ok';
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // }
}
