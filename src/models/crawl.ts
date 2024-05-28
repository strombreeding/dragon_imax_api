import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { MovieInfo } from 'src/crawl/types';

export type CrawlDocument = HydratedDocument<Crawl>;

@Schema()
export class Crawl {
  @Prop()
  date: string;

  @Prop({ type: Object })
  movieData: MovieInfo[];
}
export const CrawlSchema = SchemaFactory.createForClass(Crawl);
