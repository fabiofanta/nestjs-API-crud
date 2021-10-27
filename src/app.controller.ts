import { Controller, Get, Post, Request, UseGuards, Headers } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Roles } from './roles/roles.decorator';
import { Role } from './roles/role.enum';
import { RolesGuard } from './roles/roles.guard';
import { TokenBlacklistGuard } from './token-blacklist/token-blacklist.guard';




@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard, TokenBlacklistGuard)
  @Post('auth/logout')
  async logout(@Headers('authorization') token) {
    token = token.split(' ');
    return this.authService.logout(token[1]);
  }

  @UseGuards(JwtAuthGuard, RolesGuard, TokenBlacklistGuard)
  @Get('profile')
  @Roles(Role.Admin)
  async getProfile(@Request() req) {
    return req.user;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
