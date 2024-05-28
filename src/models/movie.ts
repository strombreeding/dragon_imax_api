import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MovieDocument = HydratedDocument<Movie>;

type Info = {
  movieName: string;
  cinemaType: string[];
  postImg: string;
};
@Schema()
export class Movie {
  @Prop()
  info: Info[];
}
export const MovieSchema = SchemaFactory.createForClass(Movie);
