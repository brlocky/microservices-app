import { auth } from '@app/common/proto/auth';
import { Body, Post, Request, UseGuards } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AuthGRpcService } from '../auth-grpc/auth-grpc.service';
import { AuthGuard } from '../../guards/auth.guard';
import { LocalGuard } from '../../guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthGRpcService) {}

  @Post('register')
  async registerUser(
    @Body() data: auth.RegisterRequest,
  ): Promise<auth.RegisterResponse> {
    return this.authService.registerUser(data);
  }

  @UseGuards(LocalGuard)
  @Post('login')
  async login(@Body() data: auth.LoginRequest, @Request() req: Request) {
    return req['token'];
  }

  @UseGuards(AuthGuard)
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
