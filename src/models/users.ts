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
  nickname: string;

  @Prop()
  deviceId: string;

  @Prop()
  skip_ad: boolean;

  @Prop()
  superCat: number; // 광고로 본 토큰 말하는 거임

  @Prop({})
  subscriptions: Subscription[];

  @Prop({ default: new Date() })
  create_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
