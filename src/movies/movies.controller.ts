import { Body, Controller, Get, Put } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}

  @Get()
  async getMovieList() {
    const result = await this.movieService.getItem();
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
