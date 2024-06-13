import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Alarm } from 'src/models/alarm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AlarmService {
  constructor(
    @InjectModel(Alarm.name)
    private readonly alarmModel: Model<Alarm>,
    private readonly userService: UsersService,
  ) {}

  async getAll(deviceId: string) {
    const list = await this.alarmModel.find({ deviceId });
    return list;
  }

  async upsertOne(_id: any, data?: any) {
    const queryData = {
      ...(data.date && { date: data.date }),
      ...(data.cinemaType && { cinemaType: data.cinemaType }),
      ...(data.schedule && { schedule: data.schedule }),
      ...(data.movieName && { movieName: data.movieName }),
      ...(data.checkout && { checkout: data.checkout }),
      ...(data.deviceId && { deviceId: data.deviceId }),
    };
    await this.alarmModel.updateOne(
      { _id },
      { $set: queryData },
      { upsert: true },
    );
  }

  async insertOne(data: any) {
    return await this.alarmModel.create(data);
  }
  async deleteOne(_id: any) {
    await this.alarmModel.deleteOne({ _id });
  }
}
