import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification } from 'src/models/notification';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';
import { ISchedulProps } from 'src/subscriptions/types';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<Notification>,
    private readonly configService: ConfigService,
  ) {
    const firebase_params = {
      type: 'service_account',
      projectId: 'dragon-imax-push',
      privateKeyId: this.configService.get<string>('FIREBASE_PRIVATE_ID'),
      privateKey: this.configService.get<string>('FIREBASE_PRIVATE_KEY'),
      clientEmail: this.configService.get<string>('FIREBASE_CLIENT_EMAIL'),
      clientId: this.configService.get<string>('FIREBASE_CLIENT_ID'),
      authProviderX509CertUrl:
        this.configService.get<string>('FIREBASE_CERT_URL1'),
      clientC509CertUrl: this.configService.get<string>('FIREBASE_CERT_URL2'),
      authUri: 'https://accounts.google.com/o/oauth2/auth',
      tokenUri: 'https://oauth2.googleapis.com/token',
    };
    admin.initializeApp({
      credential: admin.credential.cert(firebase_params),
      // credential: admin.credential.cert(firebase_params),
    });
  }

  async newNotification(
    movieName: string,
    cinemaType: string,
    date: string,
    schedule: ISchedulProps[],
  ) {
    const newList = await this.notificationModel.create({
      movieName,
      cinemaType,
      date,
      schedule: reformSchedule(schedule, cinemaType),
    });
    return newList;
  }

  async getList(cinemaType: string, movieName: string) {
    const list = await this.notificationModel.find({ cinemaType, movieName });
    return list;
  }

  async getById(_id: string) {
    const notificationInfo = await this.notificationModel.findById(_id);
    return notificationInfo;
  }

  async fcm(
    token: string,
    title: string,
    message: ISchedulProps[],
    cinemaType: string,
    notificationId: string,
  ) {
    console.log(message);
    const replaceMessage = reformSchedule(message, cinemaType);

    console.log(replaceMessage);
    const result = await admin
      .messaging()
      .sendEachForMulticast({
        tokens: [token],
        notification: {
          title: title,
          body: replaceMessage,
        },
        data: {
          _id: notificationId,
        },
        // android: {
        //   notification: {
        //     title,
        //     body: replaceMessage,
        //     // channelId: 'notify',
        //   },
        // },
      })
      .then((response) => {
        // Response is a message ID string.
        // console.log('Successfully sent message:', response);
        // return true;
        return { sent_message: response };
      })
      .catch((error) => {
        // console.log('error');
        // console.log(error.code);
        // return false;
        return { error: error.code };
      });
    return result;
  }
}

const reformSchedule = (message: ISchedulProps[], cinemaType: string) => {
  let replaceMessage = '';
  message.forEach((item, i) => {
    if (item.cinemaType.toUpperCase() !== cinemaType) return;

    item.showing.map((movie) => {
      let str = '';
      const time = movie.substring(0, 5);
      if (!movie.includes('잔여')) {
        str = time + '매진';
      } else {
        const info = movie.split(time)[1];
        str = time + ' ' + info;
      }

      replaceMessage = replaceMessage + str + '\n';
    });
  });
  return replaceMessage;
};

/* 

  private fun createNotificationChannel(context: Context) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      val channelId = "notify" // 채널 ID
      val channelName = "용아맥 뚫었냥" // 채널 이름
      val channelDescription = "용아맥 뚫었냥 푸시 알림" // 채널 설명
      val importance = NotificationManager.IMPORTANCE_HIGH // 알림 중요도 설정

      // 채널 생성
      val channel = NotificationChannel(channelId, channelName, importance).apply {
        description = channelDescription

        // 라이트 설정
        enableLights(true)
        lightColor = Color.GREEN
      }

      val notificationManager: NotificationManager =
              context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
      notificationManager.createNotificationChannel(channel)
    }
  }
*/
