import { Controller, Body, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async findUsers() {
    return this.userService.find();
  }

  @Post()
  async addUser(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }
}
