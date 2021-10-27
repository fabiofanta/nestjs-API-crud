import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { User, UserSchema } from './schemas/user.schema';
import { Business, BusinessSchema } from '../businesses/schemas/business.schema';


@Module({
  imports: [MongooseModule.forFeature([{ name: Business.name, schema: BusinessSchema}]),MongooseModule.forFeature([{ name: User.name, schema: UserSchema}])],
  providers: [UsersService],
  exports: [UsersService, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
})
export class UsersModule {}
