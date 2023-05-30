import { existsSync } from 'fs';
import { join } from 'path';

import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
	getStaticUserAvatar(avatar: string) {
		const path = join(__dirname, '../../static/avatars', avatar);

		if (!existsSync(path)) {
			throw new BadRequestException(`Not product found with image ${avatar}`);
		}

		return path;
	}
}
