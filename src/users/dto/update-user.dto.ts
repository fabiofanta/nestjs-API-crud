import { Role } from '../../roles/role.enum';
import { IsString, IsEnum, IsEmail, IsNotEmpty, IsOptional, IsArray, ArrayUnique} from 'class-validator';


export class UpdateUserDto {
    @IsOptional()
    @IsString()
    name?: string;
    @IsOptional()
    @IsNotEmpty()
    @IsEmail()
    email?: string;
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    password?: string;
    @IsOptional()
    @IsArray()
    @ArrayUnique()
    @IsEnum(Role,{
      each: true,
    })
    roles?: Role[];
    _id?: string; 
  }
  