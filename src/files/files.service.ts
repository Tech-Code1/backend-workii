import { join } from 'path';
import { existsSync } from 'fs';

import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class FilesService {

  getStaticUserAvatar(avatar: string) {

    const path = join(__dirname, '../../static/avatars', avatar);

    if( !existsSync(path) ) {
      throw new BadRequestException(`Not product found with image ${avatar}`);
    }

    return path;
  }

}
