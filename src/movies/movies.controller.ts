import { Body, Controller, Get, Put } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}

  @Get()
  async getMovieList(@Body() body: { deviceId: string }) {
    const result = await this.movieService.getItem(body.deviceId);
    return result;
  }

  @Put()
  async updateMovieList(
    @Body()
    body: { movieName: string; postImg: string; cinemaType: string[] }[],
  ) {
    console.log(body);
    await this.movieService.updateMovieList(body);

    return true;
  }
}
