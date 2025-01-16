import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class OAuthClient extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ default: true })
  active: boolean;

  @Prop()
  comment: string;

  @Prop({ required: true, unique: true })
  appId: string;

  @Prop({ required: true })
  secret: string;

  @Prop({ required: true })
  department: string;

  @Prop({ required: true })
  ownerId: string;

  @Prop({ type: [String], default: [] })
  apiScope: string[];

  @Prop({ type: [String], default: [] })
  tagsScope: string[];

  @Prop({ default: false })
  neededUserId: boolean;
}

export const OAuthClientSchema = SchemaFactory.createForClass(OAuthClient);
