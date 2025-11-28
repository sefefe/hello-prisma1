import { UpdateUserDto } from './../dto/update-user-dto';
import { UsersService } from './users.service';
import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user-dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // @Get()
  // users() {
  //   return 'new user';
  // }

  @Post('/signup')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('/createTest')
  createTest(@Body() manyusers: CreateUserDto[]) {
    return this.usersService.createMany(manyusers);
  }

  @Get('/findbyname')
  findByName(@Query('name') name: string) {
    this.usersService.findByName(name);
  }
  @Get('/findbyid/:id')
  findById(@Param('id') id: number) {
    return this.usersService.findByIde(id);
  }

  @Put('/updateuser')
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto);
  }
}
