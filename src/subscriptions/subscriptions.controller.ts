import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { IFineNewCinemaType, ISubscriptionProps } from './types';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionService: SubscriptionsService) {}

  @Get()
  async getMySubscription(@Query() query: { deviceId: string }) {
    const result = await this.subscriptionService.findBySubscripntProps({
      deviceId: query.deviceId,
    });
    return result;
  }

  @Post()
  async postNewSubscription(@Body() body: ISubscriptionProps) {
    console.log(body);
    const result = await this.subscriptionService.insert(
      body.cinemaType,
      body.deviceId,
      body.movieName,
      body.payChur,
      body.postImg,
    );
    return result;
  }

  @Delete()
  async deleteSubscription(@Body() body: { _id: string; deviceId: string }) {
    console.log(body);
    await this.subscriptionService.deleteSubscriptionQ(body._id, body.deviceId);
  }

  @Put()
  async updateSubscription(@Body() body: { _id: string; enabled: boolean }[]) {
    console.log(body);
    await this.subscriptionService.updateState(body);
  }
}
