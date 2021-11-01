import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { constants } from '../constants';
import { TokenBlacklistService } from '../token-blacklist/token-blacklist.service';



@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({
    secret: constants.secret,
    signOptions: { expiresIn: '30m' },
  }),],
  providers: [AuthService, LocalStrategy, JwtStrategy, TokenBlacklistService],
  exports: [AuthService,TokenBlacklistService],
})
export class AuthModule {}
