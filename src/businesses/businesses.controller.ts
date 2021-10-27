import { Controller, Get, Post, Put, UseGuards, Body, Param , Delete, HttpException, HttpStatus} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../roles/roles.guard';
import { TokenBlacklistGuard } from '../token-blacklist/token-blacklist.guard';
import { BusinessesGuard } from '../businesses/businesses.guard';
import { UsersDeleteGuard } from '../users/users-delete.guard';
import { BusinessesService } from './businesses.service';
import { UsersService } from '../users/users.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { BusinessPipe } from './business.pipe';
import { UserIdPipe } from '../users/user-id.pipe';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/role.enum';



@Controller('businesses')
export class BusinessesController {
    constructor(private readonly BusinessesService: BusinessesService, private readonly UsersService: UsersService) {}

    @Post()
    async create(@Body(BusinessPipe) businessData: CreateBusinessDto) {

        const savedData = await this.BusinessesService.create(businessData);

        if(!savedData.success) throw new HttpException({
            status: HttpStatus.BAD_REQUEST,
            error: savedData.message,
          }, HttpStatus.BAD_REQUEST);

        return savedData;
    }

    @UseGuards(JwtAuthGuard, RolesGuard, TokenBlacklistGuard, BusinessesGuard)
    @Post(':businessId/users')
    @Roles(Role.Admin)
    async createUser(@Body() userData: CreateUserDto, @Param('businessId') businessId :string) {

        const savedData = await this.UsersService.create(userData,businessId);

        if(!savedData.success) throw new HttpException({
            status: HttpStatus.BAD_REQUEST,
            error: savedData.message,
          }, HttpStatus.BAD_REQUEST);

        return savedData;
    }

    @UseGuards(JwtAuthGuard, RolesGuard, TokenBlacklistGuard, BusinessesGuard)
    @Put(':businessId/users/:userId')
    @Roles(Role.Admin)
    async editUser(@Body() updateUserData: UpdateUserDto, @Param('businessId') businessId :string, @Param('userId', UserIdPipe) userId :string) {

        const updatedData = await this.UsersService.updateOne(updateUserData,businessId,userId);

        if(!updatedData.success) throw new HttpException({
            status: HttpStatus.BAD_REQUEST,
            error: updatedData.message,
          }, HttpStatus.BAD_REQUEST);


        return updatedData;
    }

    @UseGuards(JwtAuthGuard, RolesGuard, TokenBlacklistGuard, BusinessesGuard, UsersDeleteGuard)
    @Delete(':businessId/users/:userId')
    @Roles(Role.Admin)
    async deleteUser(@Param('businessId') businessId :string, @Param('userId') userId :string) {

        const deletedData = await this.UsersService.removeOne(businessId,userId);

        if(!deletedData.success) throw new HttpException({
            status: HttpStatus.BAD_REQUEST,
            error: deletedData.message,
          }, HttpStatus.BAD_REQUEST);

        return deletedData;
    }

    @UseGuards(JwtAuthGuard, TokenBlacklistGuard, BusinessesGuard)
    @Get(':businessId/users')
    async getUsers(@Param('businessId') businessId :string) {

        const usersData = await this.UsersService.findAll(businessId);
        
        if(!usersData.success) throw new HttpException({
            status: HttpStatus.BAD_REQUEST,
            error: usersData.message,
          }, HttpStatus.BAD_REQUEST);

        return usersData;
    }
}
