import { ObjectId } from 'mongoose';
import { Subscription } from 'src/models/subscription';

export interface IFineNewCinemaType {
  cinemaType: string;
  schedule: string[];
  movieName: string;
  userId: string;
  deviceId: string;
  date: string;
}

export interface IReceiveCrawlProps {
  cinemaType: string;
  schedule: ISchedulProps[];
  movieName: string;
  date: string;
}

export interface ISchedulProps {
  cinemaType: string;
  showing: string[];
}

export interface ISubscriptionProps {
  cinemaType: string[];
  movieName: string;
  deviceId: string;
  payChur: number;
  postImg: string;
}

export interface ISubListProps extends Subscription {
  _doc: any;
  fcmToken: string;
}
