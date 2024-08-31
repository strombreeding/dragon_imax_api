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
    const currentMovie = await this.movieModel.find();
    if (currentMovie.length <= 0) {
      await this.movieModel.updateOne(
        {},
        { $set: { info: movieList } },
        { upsert: true },
      );
      return;
    }
    const currentMovieList = currentMovie[0].info.map((item) => item.movieName);
    const nextMovieList = movieList.map((item) => item.movieName);
    const upsertMovieList = currentMovieList.filter(
      (item) => !nextMovieList.includes(item),
    );

    // 상영 종료된 영화의 구독 내역을 지움
    if (upsertMovieList.length > 0) {
      await this.subscriptionService.disableSubscription(upsertMovieList);
    }

    await this.movieModel.updateOne(
      {},
      { $set: { info: movieList } },
      { upsert: true },
    );
  }

  async getItem(deviceId: string) {
    try {
      const list = await this.movieModel.find();
      const subscription = await this.subscriptionService.findBySubscripntProps(
        { deviceId, expired: false },
      );
      const copy: any[] = [...list];
      const listMerge = mergedList(subscription);
      const copyList = list[0].info;
      // listMerge.map((item,i)=>{
      //   copyList.map((mom,a)=>{
      //     if(item.movieName ===)
      //   })
      // })
      copyList.map((mom, i) => {
        listMerge.map((item, a) => {
          if (item.movieName === mom.movieName) {
            copy[0].info[i].subscription = item.subscription;
            return;
          }
        });
      });
      return copy;
    } catch (err) {
      console.log('??', err);
      throw new HttpException('없음', HttpStatus.NOT_FOUND);
    }
  }
}

const mergedList = (movies: any[]) => {
  const mergedMovies = movies.reduce((acc, movie) => {
    const existingMovie = acc.find((m) => m.movieName === movie.movieName);
    if (existingMovie) {
      if (!existingMovie.subscription.includes(movie.cinemaType)) {
        existingMovie.subscription.push(movie.cinemaType);
      }
    } else {
      acc.push({
        movieName: movie.movieName,
        subscription: [movie.cinemaType], // Initialize cinemaType as an array
      });
    }

    return acc;
  }, []);
  return mergedMovies;
};
