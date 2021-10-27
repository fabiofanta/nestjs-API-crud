import { HttpException, HttpStatus } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User, UserSchema } from '../../users/schemas/user.schema';

export type BusinessDocument = Business & Document;

@Schema({timestamps:true})
export class Business {
  @Prop()
  name: string;

  @Prop({type : [UserSchema]})
  users: User[] & Types.DocumentArray<Document<User>>
}

export const BusinessSchema = SchemaFactory.createForClass(Business);

BusinessSchema.pre('validate', async function(next) {

  const business: Business = this as any;
  let unique = [];

  for (let i = 0, l = business.users.length; i < l; i++) {
     let prop = business.users[i].email;

     if (unique.indexOf(prop) > -1) {
            return next(new HttpException({
              status: HttpStatus.NOT_ACCEPTABLE,
              error: 'Duplicated username inside the same business not allowed',
            }, HttpStatus.NOT_ACCEPTABLE));
     }

     unique.push(prop);
  }

  next();
});
