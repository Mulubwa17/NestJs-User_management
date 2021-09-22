import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async addUser(
    @Body('firstname') firstname: string,
    @Body('lastname') lastname: string,
    @Body('email') email: string,
    @Body('contact') contact: number,
  ) {
    const user = await this.userService.insertUser(
      firstname,
      lastname,
      email,
      contact,
    );
    return user;
  }

  @Get()
  async getAllUsers() {
    const users = await this.userService.getUsers();
    return users;
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.getSingleUser(id);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body('firstname') firstname: string,
    @Body('lastname') lastname: string,
    @Body('email') email: string,
    @Body('contact') contact: number,
  ) {
    const user = await this.userService.updateUser(
      id,
      firstname,
      lastname,
      email,
      contact,
    );
    return user;
  }

  @Delete(':id')
  async removeUser(@Param('id') id: string) {
    const user = await await this.userService.deleteUser(id);
    return user;
  }
}
