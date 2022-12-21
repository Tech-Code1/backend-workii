import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { UserDto } from 'src/users/DTOs/create-user.dto';
import { UpdateUserDto } from './DTOs/update-user.dto';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService,
        private authService: AuthService) {}

    @Get()
    getAllUser() {
        this.usersService.getAll()
    }

    @Get(':id')
    getUserById(@Param('id', ParseUUIDPipe) id: string) {

       // return this.usersService.getUser(id)
    }


    @Post()
    async createUser(@Body() userRegister: UserDto) {  
    
        //console.log(id);
        return this.usersService.create(userRegister)
    }

    @Patch(':id') 
    updateUser(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateUserDto: UpdateUserDto) {
  
        return this.usersService.update(id, updateUserDto)
    }

    @Delete(':id') 
    deleteUser(@Param('id', ParseUUIDPipe) id: string) {
        return this.usersService.delete(id)
    }

    @Post("send/otp")
    async sendPassword(@Body() body: {email: string, password: string}): Promise<void> {
      this.usersService.sendOtpByEmail(body.email, body.password)
    }
}
