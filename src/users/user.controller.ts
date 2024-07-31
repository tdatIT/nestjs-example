import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserRequest } from './dto/create-user';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('/:id')
  findById(@Param('id') user_id: number): Promise<User | null> {
    return this.userService.findOne(user_id);
  }

  @Post()
  create(@Body() request: CreateUserRequest) {
    this.userService.createNewUser(request);
  }

  @Put()
  update(@Body() request: CreateUserRequest) {
    this.userService.createNewUser(request);
  }

  @Delete('/:id')
  delete(@Param('id') user_id: number) {
    this.userService.remove(user_id);
  }
}
