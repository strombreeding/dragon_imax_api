import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Subscription } from 'src/models/subscription';
import { IFineNewCinemaType } from './types';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectModel(Subscription.name)
    private readonly subscriptionModel: Model<Subscription>,
  ) {}

  async findAll(
    date: string,
    cinemaType: string,
    movieName: string,
  ): Promise<null | Subscription[]> {
    const result = await this.subscriptionModel.find({
      date,
      cinemaType,
      movieName,
    });
    return result;
  }

  async insert(
    date: string,
    cinemaType: string,
    deviceId: string,
    movieName: string,
    userId: string,
  ) {
    const isBe = await this.subscriptionModel.findOne({
      date,
      cinemaType,
      deviceId,
      movieName,
      userId,
    });
    if (isBe) return isBe;
    const newItem = await this.subscriptionModel.create({
      date,
      cinemaType,
      deviceId,
      movieName,
      userId,
    });
    return newItem;
  }

  async updateMany(
    date: string,
    cinemaType: string,
    movieName: string,
    schedule: string[],
  ) {
    await this.subscriptionModel.updateMany(
      { date, cinemaType, movieName },
      { $set: { success: true, schedule } },
    );
  }
}
