import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserBody } from './dto/create-user.dto';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Get()
    getUsers(){
        return this.userService.findAll();
    }
    @Post()
    createUser(@Body() user:CreateUserBody){
        return this.userService.create(user);
    }
}
