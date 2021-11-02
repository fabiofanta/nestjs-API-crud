import { Test, TestingModule } from '@nestjs/testing';
import { AccountsService } from './accounts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Business, BusinessSchema } from '../businesses/schemas/business.schema';
import { constants } from '../constants';


describe('AccountsService', () => {
  let service: AccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MongooseModule.forFeature([{ name: Business.name, schema: BusinessSchema}]), MongooseModule.forRoot(constants.mongoURILocal)],
      providers: [AccountsService],
      exports: [AccountsService]
    }).compile();

    service = module.get<AccountsService>(AccountsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
