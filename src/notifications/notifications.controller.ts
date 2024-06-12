import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service';
import { IReceiveCrawlProps } from 'src/subscriptions/types';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly notificationService: NotificationsService,
    private readonly subscriptionService: SubscriptionsService,
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
    const subscriptor =
      await this.subscriptionService.findByCinemaTypeAndMovieName(
        cinemaType,
        movieName,
      );
    console.log('구독자 수 : ', subscriptor);
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
    );

    for (let i = 0; i < subscriptor.length; i++) {
      await this.notificationService.fcm(
        subscriptor[i].fcmToken,
        `${movieName}/${cinemaType}/${date}`,
        schedule,
        cinemaType,
        notificationId._id.toString(),
      );
      console.log('푸시 발송');
    }
    // await this.notificationService.fcm()
    // 아래는 내역 저장

    // console.log(
    //   `[${isBe.date}]-[${isBe.cinemaType}]-[${isBe.movieName}] -업데이트-`,
    // );
    // return `[${isBe.date}]-[${isBe.cinemaType}]-[${isBe.movieName}] -업데이트-`;
  }
}
