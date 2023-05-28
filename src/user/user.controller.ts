import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseUUIDPipe,
	Patch,
	Post,
	Query,
	UploadedFile,
	UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { PaginationDto } from 'src/common/DTOs/pagination.dto';
import { fileNamer } from 'src/common/helpers';
import { fileFilter } from 'src/common/helpers/fileFilter.helper';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto, UpdateUserDto } from './DTOs/index.dto';
import { UsersService } from './user.service';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService, private authService: AuthService) {}

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
				filename: fileNamer
			})
		})
	)
	async createUser(@Body() userRegister: CreateUserDto, @UploadedFile() avatar: Express.Multer.File) {
		return this.usersService.create(userRegister, avatar);
	}

	@Patch(':id')
	@UseInterceptors(
		FileInterceptor('avatar', {
			fileFilter: fileFilter,
			limits: { fileSize: 1000000 },
			storage: diskStorage({
				destination: './static/avatars',
				filename: fileNamer
			})
		})
	)
	updateUser(
		@Param('id', ParseUUIDPipe) id: string,
		@Body() updateUserDto: UpdateUserDto,
		@UploadedFile() avatarFile: Express.Multer.File
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
