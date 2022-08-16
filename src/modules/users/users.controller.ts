import { UsersService } from './users.service';
import { Controller, Delete, Get, Param, Post, Res } from '@nestjs/common';
import { response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('/:deviceId')
  async createNewDeviceRecord(@Param('deviceId') deviceId: string) {
    return this.userService.createNewDeviceRecord(deviceId);
  }

  //TODO: delete below after manuel testing.
  @Get()
  async getUsers() {
    return this.userService.getUsers();
  }

  @Delete()
  async deleteUsers() {
    return this.userService.deleteUsers();
  }
}
