import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AlarmDocument = HydratedDocument<Alarm>;

@Schema()
export class Alarm {
  @Prop()
  date: string;

  @Prop()
  notificationId: string;

  @Prop({ required: true })
  cinemaType: string; // 아이맥스, 4dx

  @Prop({ required: true })
  movieName: string;

  @Prop({ required: true })
  deviceId: string;

  @Prop()
  postImg: string;

  @Prop({ default: false })
  checkout: boolean;

  @Prop({ default: new Date() })
  createAt: Date;
}
export const AlarmSchema = SchemaFactory.createForClass(Alarm);
