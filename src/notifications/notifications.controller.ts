import { Body, Controller, Post } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service';
import { IFineNewCinemaType } from 'src/subscriptions/types';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly notificationService: NotificationsService,
    private readonly subscriptionService: SubscriptionsService,
  ) {}

  @Post()
  async push(@Body() body: IFineNewCinemaType) {
    console.log(body.date, body.cinemaType);
    const subscriptor = await this.subscriptionService.findAll(
      body.date,
      body.cinemaType,
      body.movieName,
    );
    if (subscriptor.length === 0) {
      // 여기서 시스템 로그 찍자.
      // 날짜 영화이름 타입 푸시여부
      return '내역없음';
    }
    console.log('푸시 발송');
    //포문으로 isBe
    await this.subscriptionService.updateMany(
      body.date,
      body.cinemaType,
      body.movieName,
      body.schedule,
    );
    // console.log(
    //   `[${isBe.date}]-[${isBe.cinemaType}]-[${isBe.movieName}] -업데이트-`,
    // );
    // return `[${isBe.date}]-[${isBe.cinemaType}]-[${isBe.movieName}] -업데이트-`;
  }
}
