import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { STATUS_CODES } from 'http';
import { Model } from 'mongoose';
import { Movie } from 'src/models/movie';
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie.name)
    private readonly movieModel: Model<Movie>,
    private readonly subscriptionService: SubscriptionsService,
  ) {}

  async updateMovieList(
    movieList: {
      movieName: string;
      postImg: string;
      cinemaType: string[];
    }[],
  ) {
    await this.movieModel.updateOne(
      {},
      { $set: { info: movieList } },
      { upsert: true },
    );
  }

  async getItem(deviceId: string) {
    try {
      const list = await this.movieModel.find();
      // list = {movieName :}[]
      const movieNameList = list[0].info.forEach((item) => item.movieName);
      console.log(movieNameList);
      // await this.subscriptionService.findBySubscripntProps(body);
      return list;
    } catch (err) {
      throw new HttpException('없음', HttpStatus.NOT_FOUND);
    }
  }
}
