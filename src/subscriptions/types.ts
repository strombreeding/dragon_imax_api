import { ObjectId } from 'mongoose';

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
  schedule: string[];
  movieName: string;
  date: string;
}
