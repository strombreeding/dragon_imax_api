import { ObjectId } from 'mongoose';

export interface IFineNewCinemaType {
  date: string;
  cinemaType: string;
  schedule: string[];
  movieName: string;
  userId: string;
}
