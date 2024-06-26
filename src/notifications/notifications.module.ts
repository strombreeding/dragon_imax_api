import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Notification, NotificationSchema } from 'src/models/notification';
import { SubscriptionsModule } from 'src/subscriptions/subscriptions.module';
import { AlarmModule } from 'src/alarm/alarm.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
    ]),
    SubscriptionsModule,
    AlarmModule,
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
