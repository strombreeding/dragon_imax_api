import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Crawl } from 'src/models/crawl';
import { MovieData } from './types';

@Injectable()
export class CrawlService {
  constructor(
    @InjectModel(Crawl.name)
    private readonly crawlModel: Model<Crawl>,
  ) {}

  async findAllData() {
    const today = getCurrentDate();
    await this.crawlModel.deleteMany({ date: { $lt: today } });
    const movieData = await this.crawlModel.find();

    const setUpFormat = movieData.map((item) => {
      const obj: MovieData = {};
      obj[item.date] = item.movieData;
      return obj;
    });
    const result = setUpFormat.reduce((acc, obj) => {
      const key = Object.keys(obj)[0]; // 객체의 키 가져오기
      acc[key] = obj[key]; // 객체의 값을 새 객체에 할당
      return acc;
    }, {});

    return result;
  }

  async postData(data: { date: string; movieData: MovieData[] }) {
    await this.crawlModel.updateOne(
      { date: data.date },
      { $set: { date: data.date, movieData: data.movieData } },
      { upsert: true },
    );
  }
}

function getCurrentDate(): string {
  const today: Date = new Date();
  const year: number = today.getFullYear();
  let month: number | string = today.getMonth() + 1;
  let day: number | string = today.getDate();

  // 한 자리 숫자일 경우 앞에 0을 붙여 두 자리로 만듭니다.
  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;

  return year + '' + month + '' + day;
}

console.log(getCurrentDate()); // YYYYMMDD 형식의 현재 날짜 출력
