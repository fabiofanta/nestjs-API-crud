
class BusinessPayloadResponseDto {
    name:string;
    email:string;
    businessId: string;
}

export class BusinessResponseDto {
    constructor(message:string,success:boolean,payload?:BusinessPayloadResponseDto) {
        this.message = message;
        this.success = success;
        this.payload = payload
    }

    success:boolean;
    message:string;
    payload?:BusinessPayloadResponseDto

}