import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SubscriptionDocument = HydratedDocument<Subscription>;

@Schema()
export class Subscription {
  @Prop({ required: true })
  movieName: string;

  @Prop({ required: true })
  deviceId: string;

  @Prop({ required: true })
  cinemaType: string; // 아이맥스, 4dx

  @Prop({ default: true })
  enabled: boolean;

  @Prop({ required: true })
  postImg: string;

  @Prop({ default: false })
  expired: boolean;

  @Prop({ default: new Date() })
  create_at: Date;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
