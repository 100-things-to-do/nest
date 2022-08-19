import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { response } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDto } from './models/dtos/UserDto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('/:deviceId')
  @ApiOperation({ summary: 'Creates new device record' })
  async createNewDeviceRecord(
    @Param('deviceId') deviceId: string,
    @Body() userDto: UserDto,
  ) {
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
