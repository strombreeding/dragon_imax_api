import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Subscription } from 'src/models/subscription';
import { IFineNewCinemaType, IReceiveCrawlProps } from './types';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectModel(Subscription.name)
    private readonly subscriptionModel: Model<Subscription>,
  ) {}

  async findByCinemaTypeAndMovieName(
    cinemaType: string,
    movieName: string,
  ): Promise<null | Subscription[]> {
    const result = await this.subscriptionModel.find({
      cinemaType,
      movieName,
    });

    return result;
  }

  async findBySubscripntProps(data: Subscription) {
    const queryData = {
      ...(data.movieName && { movieName: data.movieName }),
      ...(data.deviceId && { deviceId: data.deviceId }),
      ...(data.cinemaType && { cinemaType: data.cinemaType }),
    };
    const result = await this.subscriptionModel.find(queryData);
    return result;
  }

  async insert(
    cinemaType: string,
    deviceId: string,
    movieName: string,
    userId: string,
  ) {
    const isBe = await this.subscriptionModel.findOne({
      cinemaType,
      deviceId,
      movieName,
      userId,
    });
    if (isBe) return isBe;
    const newItem = await this.subscriptionModel.create({
      cinemaType,
      deviceId,
      movieName,
      userId,
    });
    return newItem;
  }

  async updateMany(cinemaType: string, movieName: string, schedule: string[]) {
    await this.subscriptionModel.updateMany(
      { cinemaType, movieName },
      { $set: { success: true, schedule } },
    );
  }
}
