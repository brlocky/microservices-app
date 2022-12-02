import { auth } from '@app/common/proto/auth';
import { Body, Get, Post, UseGuards } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerUser(@Body() data: auth.RegisterRequest): Promise<auth.RegisterResponse> {
    return this.authService.registerUser(data);
  }

  //@UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() data: auth.LoginRequest) {
    return this.authService.loginUser(data);
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // }
}