import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model } from 'mongoose';
import { User } from 'src/models/users';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async findUser(deviceId: string) {
    const user = await this.userModel.findOne({ deviceId });
    return user;
  }

  async join(deviceId: string) {
    const user = await this.findUser(deviceId);
    if (user) return true;
    const newUser = await this.userModel.create({ deviceId });
    return newUser;
  }

  async updateChur(deviceId: string, payChur: number) {
    const user = await this.userModel.findOne({ deviceId });
    const currentChur = user.chur;
    console.log('소지츄르:', currentChur, '요구츄르:', payChur);
    if (currentChur < payChur) {
      throw new HttpException('결제 실패', HttpStatus.BAD_REQUEST);
    }

    await this.userModel.findOneAndUpdate(
      { deviceId },
      { $set: { chur: user.chur - payChur } },
    );
  }

  async updateFcmToken(deviceId: string, fcmToken: string) {
    const update = await this.userModel.findOneAndUpdate(
      { deviceId },
      {
        $set: {
          fcmToken,
        },
      },
    );
    if (update != null) {
      return update.fcmToken;
    }
  }

  async deleteUser(deviceId: string) {
    await this.userModel.findOneAndDelete({ deviceId });
    await axios.delete('http://localhost:8080/subscriptions', {
      data: { deviceId },
    });
  }
}
