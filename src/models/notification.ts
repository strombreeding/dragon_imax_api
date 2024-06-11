import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NotificationDocument = HydratedDocument<Notification>;

@Schema()
export class Notification {
  @Prop()
  date: string;

  @Prop({ required: true })
  cinemaType: string; // 아이맥스, 4dx

  @Prop({ required: true })
  schedule: string;

  @Prop({ required: true })
  movieName: string;

  @Prop({ default: new Date() })
  createAt: Date;
}
export const NotificationSchema = SchemaFactory.createForClass(Notification);
