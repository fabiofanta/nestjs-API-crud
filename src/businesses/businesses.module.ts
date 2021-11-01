import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BusinessesController } from './businesses.controller';
import { Business, BusinessSchema } from './schemas/business.schema';
import { BusinessesService } from './businesses.service';
import { UsersModule } from '../users/users.module';
import { AccountsModule } from '../accounts/accounts.module';
import { TokenBlacklistService } from '../token-blacklist/token-blacklist.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Business.name, schema: BusinessSchema }]), UsersModule, AccountsModule],
    controllers: [BusinessesController],
    providers: [BusinessesService,TokenBlacklistService],
    exports: [BusinessesService],
})
export class BusinessesModule {}
