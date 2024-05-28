import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { STATUS_CODES } from 'http';
import { Model } from 'mongoose';
import { Movie } from 'src/models/movie';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie.name)
    private readonly movieModel: Model<Movie>,
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

  async getItem() {
    try {
      const list = await this.movieModel.find();
      return list;
    } catch (err) {
      throw new HttpException('없음', HttpStatus.NOT_FOUND);
    }
  }
}
