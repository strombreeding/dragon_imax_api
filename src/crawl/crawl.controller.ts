import { Body, Controller, Get, Put } from '@nestjs/common';
import { CrawlService } from './crawl.service';
import { MovieData } from './types';

@Controller('crawl')
export class CrawlController {
  constructor(private readonly crawlService: CrawlService) {}

  @Get()
  async getAllData() {
    const result = await this.crawlService.findAllData();
    return result;
  }

  @Put()
  async putData(@Body() body: { date: string; movieData: MovieData[] }) {
    // console.log(body.date);
    await this.crawlService.postData(body);
    return;
  }
}
