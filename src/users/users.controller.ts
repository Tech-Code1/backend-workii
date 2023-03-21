import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { UpdateUserDto, CreateUserDto } from './DTOs/index.dto';
import { PaginationDto } from 'src/common/DTOs/pagination.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from 'src/common/helpers/fileFilter.helper';
import { diskStorage } from 'multer';
import { fileNamer } from 'src/common/helpers';
import { LoginUserDto } from '../auth/DTOs/login-user.dto';
import { User } from './users.entity';
import { log } from 'console';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get()
  getAllUser(@Query() paginationDto: PaginationDto) {
    return this.usersService.getAll(paginationDto);
  }

  @Get(':id')
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getUserById(id);
  }

  @Post('register')
  @UseInterceptors(
    FileInterceptor('avatar', {
      fileFilter: fileFilter,
      limits: { fileSize: 1000000 },
      storage: diskStorage({
        destination: './static/avatars',
        filename: fileNamer,
      }),
    }),
  )
  async createUser(
    @Body() userRegister: CreateUserDto,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    return this.usersService.create(userRegister, avatar);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('avatar', {
      fileFilter: fileFilter,
      limits: { fileSize: 1000000 },
      storage: diskStorage({
        destination: './static/avatars',
        filename: fileNamer,
      }),
    }),
  )
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() avatarFile: Express.Multer.File,
  ) {
    if (avatarFile) {
      const backendUrl = 'http://localhost:3000';
      const avatarPath = `/static/avatars/${avatarFile.filename}`;
      const fullAvatarUrl = backendUrl + avatarPath;
      updateUserDto.avatar = fullAvatarUrl;
    }
    console.log(updateUserDto);
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.delete(id);
  }
}
