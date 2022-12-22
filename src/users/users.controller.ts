import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { UpdateUserDto, CreateUserDto } from './DTOs/index.dto';
import { PaginationDto } from 'src/common/DTOs/pagination.dto';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService,
        private authService: AuthService) {}

    @Get()
    getAllUser(@Query() paginationDto: PaginationDto) {
       return this.usersService.getAll(paginationDto)
    }

    @Get(':id')
    getUserById(@Param('id', ParseUUIDPipe) id: string) {

       return this.usersService.getUserById(id)
    }


    @Post()
    async createUser(@Body() userRegister: CreateUserDto) {  
    
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
