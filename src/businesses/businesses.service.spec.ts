import { Test, TestingModule } from '@nestjs/testing';
import { BusinessesService } from './businesses.service';
import { BusinessesController } from './businesses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Business, BusinessSchema } from './schemas/business.schema';
import { UsersModule } from '../users/users.module';
import { AccountsModule } from '../accounts/accounts.module';
import { TokenBlacklistService } from '../token-blacklist/token-blacklist.service';
import { constants } from '../constants';


describe('BusinessesService', () => {
  let service: BusinessesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MongooseModule.forFeature([{ name: Business.name, schema: BusinessSchema }]), UsersModule, AccountsModule, MongooseModule.forRoot(constants.mongoURILocal)],
      controllers: [BusinessesController],
      providers: [BusinessesService,TokenBlacklistService],
      exports: [BusinessesService],
    }).compile();

    service = module.get<BusinessesService>(BusinessesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
