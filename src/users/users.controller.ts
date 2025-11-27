import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user-dto';

@Controller('users')
export class UsersController {
    @Get()
    users(){

        return 'new user';

    }

    @Post('/signup')
    create(@Body() createUserDto: CreateUserDto){
        return createUserDto;
    }
}
