import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { CrawlModule } from './crawl/crawl.module';
import { NotificationsModule } from './notifications/notifications.module';
import { MoviesModule } from './movies/movies.module';
import { AlarmModule } from './alarm/alarm.module';
import * as dotenv from 'dotenv';
//
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL, {
      dbName: process.env.MONGO_DB,
      user: process.env.MONGO_USER,
      pass: process.env.MONGO_PWD,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    SubscriptionsModule,
    CrawlModule,
    NotificationsModule,
    MoviesModule,
    AlarmModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
