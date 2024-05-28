import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { IFineNewCinemaType } from './types';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionService: SubscriptionsService) {}

  @Get()
  async getMySubscription(@Query() query: { deviceId: string }) {
    console.log(query);
    return true;
  }

  @Post()
  async postNewSubscription(@Body() body: IFineNewCinemaType) {
    const result = await this.subscriptionService.insert(
      body.date,
      body.cinemaType,
      '123123',
      body.movieName,
      body.userId,
    );
    return result;
  }
}
