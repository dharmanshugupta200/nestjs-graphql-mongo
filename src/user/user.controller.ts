import { Controller, Get, Post, Put, Delete, Body, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/finduser')
  findUser(@Query('id') id: string) {
    return this.userService.findOne(id);
  }

  @Get('/allusers')
  findAllUsers() {
    return this.userService.findAll();
  }

  @Post('/createuser')
  createUser(@Body() createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Put('/updateuser')
  updateUser(@Body() updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput);
  }

  @Delete('/removeuser')
  removeUser(@Query('id') id: string) {
    return this.userService.remove(id);
  }
}
