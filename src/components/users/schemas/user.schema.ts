import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


export type UserDocument = User & Document;


@Schema({
  timestamps: true,
})
export class User {
  static readonly collection = 'users';

  @Prop()
  _id: Types.ObjectId;

  @Prop()
  name: string;

  @Prop({
    unique: true,
  })
  mobile: string;

  @Prop({
    default: null,
  })
  mobileVerifiedAt: Date;

  @Prop({
    unique: true,
  })
  email: string;

  @Prop({
    default: null,
  })
  emailVerifiedAt: Date;

  @Prop()
  password: string;

  @Prop({
    default: true,
  })
  enabled: boolean;

  @Prop({
    default: new Date(),
  })
  createdAt: Date;

  @Prop({
    default: new Date(),
  })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
