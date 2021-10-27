import { Role } from '../../roles/role.enum';
import { IsString, IsEnum, IsEmail, IsNotEmpty, IsDefined , IsArray, ArrayUnique} from 'class-validator';


export class CreateUserDto {
    @IsString()
    name: string;
    @IsDefined()
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    password: string;
    @IsArray()
    @ArrayUnique()
    @IsEnum(Role,{
      each: true,
    })
    roles: Role[];
    _id?: string; 
  }
  