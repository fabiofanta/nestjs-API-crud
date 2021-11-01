import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { isEnum } from 'class-validator';
import { AccountInterval } from './account-interval.enum';


@Injectable()
export class AccountIntervalPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value && !isEnum(value,AccountInterval)) {
      throw new BadRequestException(`${value} is not a valid interval`);
    }
    return value;
  }
}
