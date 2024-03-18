import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


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
    type: Number,
    nullable: false,
  })
  user: PersonalAccessToken;

  @Prop({
    nullable: true,
  })
  impersonatePersonalAccessTokenId: number;

  @Prop()
  name: string;

  @Prop()
  token: string;

  @Prop()
  ipAddress: string;

  @Prop()
  createdAt: Date;

  @Prop({
    default: null
  })
  expiresAt: Date;

  @Prop({
    default: new Date(),
  })
  lastUsedAt: Date;
}

export const PersonalAccessTokenSchema = SchemaFactory.createForClass(PersonalAccessToken);
