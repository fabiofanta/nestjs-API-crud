import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { constants } from '../constants';
import { TokenBlacklistService } from '../token-blacklist/token-blacklist.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';



describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, PassportModule,MongooseModule.forRoot(constants.mongoURILocal) , JwtModule.register({
        secret: constants.secret,
        signOptions: { expiresIn: '30m' },
      }),],
      providers: [AuthService, LocalStrategy, JwtStrategy, TokenBlacklistService],
      exports: [AuthService,TokenBlacklistService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
