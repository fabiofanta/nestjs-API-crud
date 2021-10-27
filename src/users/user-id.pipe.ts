import { ArgumentMetadata, Injectable, PipeTransform , BadRequestException } from '@nestjs/common';
import { isAlphanumeric } from 'class-validator';

@Injectable()
export class UserIdPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata): Promise<string> {

    if (!isAlphanumeric(value)) {
      throw new BadRequestException('Not valid User Id');
    }
    return value;
  }
}
