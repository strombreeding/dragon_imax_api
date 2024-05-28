import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(userService: UsersService) {}

  // @Post()
  // async join (@Body() body:{nickname:}){

  // }
}
