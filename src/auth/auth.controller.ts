import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtRefreshTokenGuard } from './jwt-refresh-token.guard';
import { RequestWithUser } from './request-with-user.interface';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('google')
  async googleAuth(@Body() tokenData) {
    return this.authService.validateGoogle(tokenData.token);
  }

  @Post('refreshtoken')
  @UseGuards(JwtRefreshTokenGuard)
  async refreshToken(@Request() req: RequestWithUser) {
    return this.authService.handleRegisteredUser(req.user);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getUser(@Request() req: RequestWithUser) {
    return req.user;
  }
}
