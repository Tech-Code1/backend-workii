import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, Query, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { UpdateUserDto, CreateUserDto } from './DTOs/index.dto';
import { PaginationDto } from 'src/common/DTOs/pagination.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from 'src/common/helpers/fileFilter.helper';
import { diskStorage } from 'multer';
import { fileNamer } from 'src/common/helpers';

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
    @UseInterceptors( FileInterceptor('file', {
        fileFilter: fileFilter,
        limits: { fileSize: 1000000},
        storage: diskStorage({
          destination: './static/avatars',
          filename: fileNamer
        })
    }) )
    async createUser(@Body() userRegister: CreateUserDto, @UploadedFile() file: Express.Multer.File) {
    
    
        console.log(file);
        return this.usersService.create(userRegister, file)
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
