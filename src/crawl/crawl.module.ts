import { Module } from '@nestjs/common';
import { CrawlController } from './crawl.controller';
import { CrawlService } from './crawl.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Crawl, CrawlSchema } from 'src/models/crawl';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Crawl.name, schema: CrawlSchema }]),
  ],
  controllers: [CrawlController],
  providers: [CrawlService],
})
export class CrawlModule {}
