import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Business, BusinessDocument } from './schemas/business.schema';
import { CreateBusinessDto } from './dto/create-business.dto';
import { BusinessResponseDto } from './dto/business-response.dto';

@Injectable()
export class BusinessesService {
    constructor(@InjectModel(Business.name) private businessModel: Model<BusinessDocument>) {}

    async create(createBusinessDto: CreateBusinessDto): Promise<BusinessResponseDto> {
        const createdBusiness = new this.businessModel(createBusinessDto);
        
        try {
            const saveBusiness = await createdBusiness.save();

            const businessAdminUser = saveBusiness.users.pop();

            const payload = {name:businessAdminUser.name,email:businessAdminUser.email,businessId:saveBusiness._id}

            return new BusinessResponseDto(`businessId:${saveBusiness._id} created successfully`, true, payload);
        } 
        catch (error) {
            return new BusinessResponseDto(`business not created successfully`, false);
        }

    }
}
