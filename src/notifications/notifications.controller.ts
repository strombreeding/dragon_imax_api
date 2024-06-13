import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service';
import { IReceiveCrawlProps } from 'src/subscriptions/types';
import { AlarmService } from 'src/alarm/alarm.service';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly notificationService: NotificationsService,
    private readonly subscriptionService: SubscriptionsService,
    private readonly alarmService: AlarmService,
  ) {}

  @Get()
  async getOne(@Query() query: { _id: string }) {
    const result = await this.notificationService.getById(query._id);
    return result;
  }
  @Get('list')
  async getList(@Query() query: { cinemaType: string; movieName: string }) {
    const result = await this.notificationService.getList(
      query.cinemaType,
      query.movieName,
    );
    return result;
  }

  @Post()
  async push(@Body() body: IReceiveCrawlProps) {
    const cinemaType = body.cinemaType.toUpperCase();
    const movieName = body.movieName;
    const date = body.date;
    const schedule = body.schedule;
    try {
      const subscriptor =
        await this.subscriptionService.findByCinemaTypeAndMovieName(
          cinemaType,
          movieName,
        );
      console.log('구독자 수 : ', subscriptor.length);
      if (subscriptor.length === 0) {
        // 여기서 시스템 로그 찍자.
        // 날짜 영화이름 타입 푸시여부
        return '내역없음';
      }
      const notificationId = await this.notificationService.newNotification(
        movieName.replace(/\s+/g, ''),
        cinemaType,
        date,
        schedule,
        subscriptor[0]._doc.postImg,
      );
      for (let i = 0; i < subscriptor.length; i++) {
        console.log(subscriptor[i]._doc.deviceId, '님께 푸시알림');
        const newAlarm = await this.alarmService.insertOne({
          notificationId: notificationId._id.toString(),
          date,
          cinemaType,
          movieName,
          deviceId: subscriptor[i]._doc.deviceId,
          postImg: subscriptor[i]._doc.postImg,
        });
        await this.notificationService.fcm(
          subscriptor[i].fcmToken,
          `${movieName}/${cinemaType}/${date}`,
          schedule,
          notificationId._id.toString(),
          cinemaType,
          subscriptor[i]._doc.postImg,
          { alarmId: newAlarm._id.toString() },
        );
      }
      console.log('푸시 발송완료 ');
    } catch (err) {
      console.log(err);
    }
    // await this.notificationService.fcm()
    // 아래는 내역 저장

    // console.log(
    //   `[${isBe.date}]-[${isBe.cinemaType}]-[${isBe.movieName}] -업데이트-`,
    // );
    // return `[${isBe.date}]-[${isBe.cinemaType}]-[${isBe.movieName}] -업데이트-`;
  }
  @Post('test')
  async fcmTestController(@Body() body: { fcmToken: string }) {
    console.log('테스트 푸쉬알림');
    setTimeout(
      async () =>
        await this.notificationService.fcm(
          body.fcmToken,
          '테스트 푸시알림',
          [],
          'test',
          null,
          'https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F81733d5f-b423-4d3e-9b57-6e1e6075dbc4%2F7d2acde1-2a0f-494b-a22b-ce61f0b758ed%2F%25E1%2584%2580%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25A2%25E1%2584%2591%25E1%2585%25B5%25E1%2586%25A8%25E1%2584%258B%25E1%2585%25B5%25E1%2584%2586%25E1%2585%25B5%25E1%2584%258C%25E1%2585%25B5.png?table=block&id=9cf90ba2-8c21-4b34-b6a4-da2e9a5e47b2&spaceId=81733d5f-b423-4d3e-9b57-6e1e6075dbc4&width=2000&userId=14cc2ef3-04b9-41f7-9991-3bf06bfcb033&cache=v2',
        ),
      3000,
    );
  }
}
