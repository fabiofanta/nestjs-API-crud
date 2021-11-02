import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Business, BusinessSchema } from '../businesses/schemas/business.schema';
import { User, UserSchema } from './schemas/user.schema';
import { constants } from '../constants';


describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MongooseModule.forFeature([{ name: Business.name, schema: BusinessSchema}]),MongooseModule.forFeature([{ name: User.name, schema: UserSchema}]),MongooseModule.forRoot(constants.mongoURILocal)],
      providers: [UsersService],
      exports: [UsersService, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
