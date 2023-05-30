import { BadRequestException, Injectable, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'express/node_modules/ms';
import { diskStorage } from 'multer';

import { existsSync } from 'fs';
import { join } from 'path';
import { fileFilter, fileNamer } from '../helpers/index';

@Injectable()
export class FileInterceptorService {
	@UseInterceptors(
		FileInterceptor('file', {
			fileFilter: fileFilter,
			limits: { fileSize: 1000000 },
			storage: diskStorage({
				destination: './static/users',
				filename: fileNamer
			})
		})
	)
	uploadFiles(@UploadedFile() file: Multer.File) {
		if (!file) {
			throw new BadRequestException('Make sure that the file is a image');
		}

		const secureUrl = `${process.env.HOST_API}/files/user/${file.filename}`;

		return { secureUrl };
	}

	async getStaticUserAvatar(avatar: string) {
		const path = join(__dirname, '../../static/avatars', avatar);

		if (!existsSync(path)) {
			throw new BadRequestException(`Not product found with image ${avatar}`);
		}

		return path;
	}
}
