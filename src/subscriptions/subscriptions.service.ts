import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Subscription } from 'src/models/subscription';
import { IFineNewCinemaType, IReceiveCrawlProps, ISubListProps } from './types';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectModel(Subscription.name)
    private readonly subscriptionModel: Model<Subscription>,
    private readonly userService: UsersService,
  ) {}

  async findByCinemaTypeAndMovieName(
    cinemaType: string,
    movieName: string,
  ): Promise<null | ISubListProps[]> {
    const result: ISubListProps[] = [] as ISubListProps[];
    const subscriptions = await this.subscriptionModel.find({
      cinemaType,
      movieName,
      enabled: true,
      expired: false,
    });
    for (let i = 0; i < subscriptions.length; i++) {
      const obj: any = { ...subscriptions[i] };
      const userFcm = await this.userService.findUser(
        subscriptions[i].deviceId,
      );
      // 탈퇴한 유저의 스크립션을 다 지우긴 하는데, 그래도 예외처리 해놔야함.
      if (userFcm != null && Object.keys(userFcm).includes('fcmToken')) {
        obj.fcmToken = userFcm.fcmToken;
        result.push(obj);
      }
    }

    return result;
  }

  async findBySubscripntProps(data: {
    movieName?: string;
    deviceId?: string;
    cinemaType?: string;
    enabled?: boolean;
    expired?: boolean;
  }) {
    const queryData = {
      ...(data.movieName && { movieName: data.movieName }),
      ...(data.deviceId && { deviceId: data.deviceId }),
      ...(data.cinemaType && { cinemaType: data.cinemaType }),
      ...(data.enabled && { enabled: data.enabled }),
      ...(data.expired && { expired: data.expired }),
    };
    const result = await this.subscriptionModel.find(queryData);
    return result;
  }

  async insert(
    cinemaType: string[],
    deviceId: string,
    movieName: string,
    payChur: number,
    postImg: string,
  ) {
    const result = [];

    try {
      for (let i = 0; i < cinemaType.length; i++) {
        const isBe = await this.subscriptionModel.findOne({
          cinemaType: cinemaType[i],
          deviceId,
          movieName,
        });
        if (isBe) return isBe;
        const newItem = await this.subscriptionModel.create({
          cinemaType: cinemaType[i],
          deviceId,
          movieName: movieName.replace(/\s+/g, ''),
          postImg,
        });
        result.push(newItem);
      }
      await this.userService.updateChur(deviceId, payChur);
    } catch (err) {
      console.log(err);
    }

    console.log(result);
    return result;
  }

  async updateMany(cinemaType: string, movieName: string, enabled: boolean) {
    await this.subscriptionModel.updateMany(
      { cinemaType, movieName },
      { $set: { enabled } },
    );
  }

  async disableSubscription(movieNameList: string[]) {
    await this.subscriptionModel.updateMany(
      {
        movieName: { $in: [...movieNameList] },
      },
      { $set: { enabled: false, expired: true } },
    );
    return true;
  }

  async deleteSubscriptionQ(_id?: string, deviceId?: string) {
    const queryData = {
      ...(deviceId && { deviceId: deviceId }),
      ...(_id && { _id: _id }),
    };
    await this.subscriptionModel.deleteMany(queryData);
    console.log(queryData);
  }

  async updateState(data: { _id: string; enabled: boolean }[]) {
    for (let i = 0; i < data.length; i++) {
      await this.subscriptionModel.findByIdAndUpdate(data[i]._id, {
        $set: { enabled: data[i].enabled },
      });
    }
  }
}
