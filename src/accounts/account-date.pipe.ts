import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException} from '@nestjs/common';
import { isDateString } from 'class-validator';


@Injectable()
export class AccountDatePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata):Promise<string> {
    if (value && !isDateString(value)) {
      throw new BadRequestException(`${value} is not a valid date`);
    }
    return value;
  }
}
