import { IsString, ValidateNested,IsNotEmpty,IsArray, IsDefined} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateUserDto } from '../../users/dto/create-user.dto';


export class CreateBusinessDto {
    @IsDefined()
    @IsString()
    name: string;
    _id: string;
    @IsDefined()
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateUserDto)
    users: CreateUserDto[]
  }
  