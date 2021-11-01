import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { Business, BusinessDocument } from '../businesses/schemas/business.schema';


@Injectable()
export class UsersService {
    constructor(@InjectModel(Business.name) private businessModel: Model<BusinessDocument>) {}

    async create(createUserDto: CreateUserDto, businessId: string): Promise<UserResponseDto> {
        
        const businessQuery = await this.businessModel.findOne({'_id':businessId});
        
        if(!businessQuery) return new UserResponseDto(`businessId:${businessId} not available for ${Business.name} collection`, false);
        
        const pushUser = businessQuery?.users.push(createUserDto);

        if(!pushUser) return new UserResponseDto(`no users key available for businessId:${businessId} in ${Business.name} collection`,false);

        try {
            const newBusinessDocument = await businessQuery.save();
            const newUser = newBusinessDocument.toObject().users.pop();
            const { password, ...noPwUser} = newUser;

            return new UserResponseDto(`userId ${noPwUser._id} saved successfully`,true,noPwUser);
        } catch(error){
            return new UserResponseDto(`new user not saved successfully`,false);
        }
        

       
    }

    async findOne(email: string): Promise<User & {businessId?:string} | undefined> {
        
        const businessDocumentByEmail = await this.businessModel.findOne({'users.email': email},{'users.$' : 1}).lean();

        const businessId = businessDocumentByEmail?._id;
        const foundUser: User & {businessId?:string} = businessDocumentByEmail?.users.pop();

        if(!foundUser) return undefined;
        
        foundUser.businessId = businessId;

        return foundUser;
    }

    
    async findAll(businessId: string): Promise<UserResponseDto> {
        const usersByBusinessId = await this.businessModel.find({_id : businessId},{'users.password': 0});

        if(!usersByBusinessId) return new UserResponseDto(`businessId:${businessId} not available for ${Business.name} collection`, false);

        const users = usersByBusinessId.pop()?.users;

        if(!users) return new UserResponseDto(`no users key available for businessId:${businessId} in ${Business.name} collection`,false);

        return new UserResponseDto(`${users.length} user found`,true,users);
    }

    async updateOne(updateUserDto: UpdateUserDto, businessId: string, userId:string): Promise<UserResponseDto> {
        const businessQuery = await this.businessModel.findById(businessId,{'users.password' : 0});

        if(!businessQuery) return new UserResponseDto(`businessId:${businessId} not available for ${Business.name} collection`, false);

        const user = businessQuery?.users.id(userId);

        if(!user) return new UserResponseDto(`no users key available for businessId:${businessId} in ${Business.name} collection`,false);

        user.set(updateUserDto);

        try {
            const updateBusinessDocument = await businessQuery.save();
            const updateUser = updateBusinessDocument.users.id(userId);

            return new UserResponseDto(`userId ${userId} edited successfully`,true,updateUser);
        }
        catch(error) {

            return new UserResponseDto(`userId ${userId} not edited successfully`,false);
        }

        
    }

    async removeOne(businessId: string, userId:string): Promise<UserResponseDto> {
        const businessQuery = await this.businessModel.findById(businessId);

        if(!businessQuery) return new UserResponseDto(`businessId:${businessId} not available for ${Business.name} collection`, false);

        const user = businessQuery?.users.id(userId);

        if(!user) return new UserResponseDto(`no users key available for businessId:${businessId} in ${Business.name} collection`,false);

        user.remove();

        try {

            const saveBusinessDocument = businessQuery.save().then(() => {
                return new UserResponseDto(`userId ${userId} removed successfully`,true,{_id:userId});
            });

            return saveBusinessDocument;
        }

        catch(error) {
            return new UserResponseDto(`userId ${userId} not removed successfully`,false);
        }

        
    }
}
