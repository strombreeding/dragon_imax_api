import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getUser(@Query() query: { deviceId: string }) {
    const user = await this.userService.findUser(query.deviceId);
    console.log(query.deviceId);
    if (!user) return { result: false };
    return { result: true, user };
  }

  @Post()
  async join(@Body() body: { deviceId: string }) {
    const newUser = await this.userService.join(body.deviceId);
    if (newUser === true) {
      return 'already';
    }
    return true;
  }

  @Put()
  async updateUser(@Body() body: { deviceId: string; fcmToken: string }) {
    const res = await this.userService.updateFcmToken(
      body.deviceId,
      body.fcmToken,
    );
    return res;
  }

  @Delete()
  async deleteUser(@Body() body: { deviceId: string }) {
    await this.userService.deleteUser(body.deviceId);
  }

  @Get('/reward')
  async admobReward(@Query() req: any) {
    console.log(req.deviceId);
    await this.userService.updateChur(req.deviceId, -1);
  }
}
