import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";



@Schema()
export class Image {
  @Prop()
  _id: string;

  @Prop()
  s: string;

  @Prop()
  m: string;

  @Prop()
  l: string;

  @Prop()
  xl: string;
}
