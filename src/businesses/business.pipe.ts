import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Business } from './schemas/business.schema';
import { Role } from '../roles/role.enum';


@Injectable()
export class BusinessPipe implements PipeTransform {
  async transform(business: Business, metadata: ArgumentMetadata): Promise<Business> {
    let onlyUserBusiness = await this.checkOnlyUserPolicy(business);
    let onlyUserAdminBusiness = await this.modifyOnlyUserRole(onlyUserBusiness);

    return onlyUserAdminBusiness;
  }

  private async checkOnlyUserPolicy(business:Business):Promise<Business> {
    if (business.users.length > 1) throw new BadRequestException('Only one user is allowed on registration');
    return business;
  }

  private async modifyOnlyUserRole(business:Business):Promise<Business> {
    business.users[0].roles = [Role.Admin];
    return business;
  }
}
