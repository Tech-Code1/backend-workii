import { BadRequestException, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { FilesService } from './files.service';

import { ApiTags } from '@nestjs/swagger';
import { fileFilter, fileNamer } from './helpers/index';

@ApiTags('files')
@Controller('files')
export class FilesController {
	constructor(private readonly filesService: FilesService) {}

	@Get('user/:avatar')
	findUserImage(@Res() res: Response, @Param('avatar') avatar: string) {
		console.log(avatar);

		const path = this.filesService.getStaticUserAvatar(avatar);

		console.log(path);

		res.sendFile(path);
	}

	@Post('user')
	@UseInterceptors(
		FileInterceptor('file', {
			fileFilter: fileFilter,
			limits: { fileSize: 1000000 },
			storage: diskStorage({
				destination: './static/uploads',
				filename: fileNamer
			})
		})
	)
	uploadFiles(@UploadedFile() file: Express.Multer.File) {
		if (!file) {
			throw new BadRequestException('Make sure that the file is a image');
		}

		const secureUrl = `${process.env.HOST_API}/files/user/${file.filename}`;

		return {
			secureUrl
		};
	}
}
