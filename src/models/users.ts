import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

type Subscription = {
  movieName: string;
  cinemaType: string;
};

@Schema()
export class User {
  @Prop()
  deviceId: string;

  @Prop({ default: 5 })
  chur: number;

  @Prop({ default: '' })
  fcmToken: string;

  @Prop({ default: new Date() })
  create_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
