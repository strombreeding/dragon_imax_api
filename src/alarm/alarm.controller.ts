import { Body, Controller, Delete, Get, Put, Query } from '@nestjs/common';
import { AlarmService } from './alarm.service';

@Controller('alarm')
export class AlarmController {
  constructor(private readonly alarmService: AlarmService) {}

  @Get()
  async findAll(@Query() query: { deviceId: string }) {
    console.log(query);
    const result = await this.alarmService.getAll(query.deviceId);
    return result;
  }

  @Put()
  async update(@Body() body: { _id: string; data?: Record<string, any> }) {
    await this.alarmService.upsertOne(body._id, body.data);
  }

  @Delete()
  async delete(@Body() body: { _id: any }) {
    await this.alarmService.deleteOne(body._id);
  }
}
