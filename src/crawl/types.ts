export interface MovieSchedule {
  cinemaType: string;
  showing: string[];
}

export interface MovieInfo {
  movieName: string;
  schedule: MovieSchedule[];
  hasCinemaTypes: string[];
}

export interface MovieData {
  [date: string]: MovieInfo[];
}
