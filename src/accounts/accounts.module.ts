import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountsService } from './accounts.service';
import { Business, BusinessSchema } from '../businesses/schemas/business.schema';


@Module({
  imports: [MongooseModule.forFeature([{ name: Business.name, schema: BusinessSchema}])],
  providers: [AccountsService],
  exports: [AccountsService]
})
export class AccountsModule {}
