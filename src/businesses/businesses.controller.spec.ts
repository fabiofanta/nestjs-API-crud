import { Test, TestingModule } from '@nestjs/testing';
import { BusinessesController } from './businesses.controller';
import { TokenBlacklistService } from '../token-blacklist/token-blacklist.service';
import { BusinessesService } from './businesses.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Business, BusinessSchema } from './schemas/business.schema';
import { UsersModule } from '../users/users.module';
import { AccountsModule } from '../accounts/accounts.module';
import { constants } from '../constants';


describe('BusinessesController', () => {
  let controller: BusinessesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MongooseModule.forFeature([{ name: Business.name, schema: BusinessSchema }]), MongooseModule.forRoot(constants.mongoURILocal), UsersModule, AccountsModule],
      controllers: [BusinessesController],
      providers: [BusinessesService,TokenBlacklistService],
      exports: [BusinessesService],
    }).compile();

    controller = module.get<BusinessesController>(BusinessesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
