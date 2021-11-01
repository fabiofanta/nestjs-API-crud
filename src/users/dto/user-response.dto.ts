import { Role } from '../../roles/role.enum';
import { User } from '../schemas/user.schema';
import { Document } from 'mongoose';



export class UserPayloadResponseDto {
    name:string;
    email:string;
    roles: Role[];
}

export class UserResponseDto {
    constructor(message:string,success:boolean,payload?:UserPayloadResponseDto | UserPayloadResponseDto[] | Document<User> | {_id:string}) {
        this.message = message;
        this.success = success;
        this.payload = payload
    }

    success:boolean;
    message:string;
    payload?:UserPayloadResponseDto | UserPayloadResponseDto[] | Document<User> | {_id:string}

}