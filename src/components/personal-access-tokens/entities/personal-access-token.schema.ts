import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../users/schemas/user.schema';
import { Type } from 'class-transformer';


export type PersonalAccessTokenDocument = PersonalAccessToken & Document;


@Schema({
  timestamps: {
    createdAt: true,
    updatedAt: false,
  },
})
export class PersonalAccessToken {
  static readonly collection = 'personalAccessTokens';

  @Prop()
  _id: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    nullable: false,
    ref: 'User',
  })
  user: User | Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    default: null,
  })
  impersonateUser: User | Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  token: string;

  @Prop()
  ipAddress: string;

  @Prop()
  createdAt: Date;

  @Prop({
    default: null,
  })
  expiresAt: Date;

  @Prop({
    default: new Date(),
  })
  lastUsedAt: Date;
}

export const PersonalAccessTokenSchema = SchemaFactory.createForClass(PersonalAccessToken);
