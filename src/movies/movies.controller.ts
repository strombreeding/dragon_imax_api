import { Body, Controller, Get, Put, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}

  @Get()
  async getMovieList(@Query() query: { deviceId: string }) {
    const result = await this.movieService.getItem(query.deviceId);
    return result;
  }

  @Put()
  async updateMovieList(
    @Body()
    body: { movieName: string; postImg: string; cinemaType: string[] }[],
  ) {
    await this.movieService.updateMovieList(body);

    return true;
  }
}
