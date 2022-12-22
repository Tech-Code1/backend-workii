import { diskStorage } from 'multer';
import { Injectable, BadRequestException, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { fileFilter, fileNamer } from '../helpers/index';
import { join } from 'path';
import { existsSync } from 'fs';


@Injectable()
export class FileInterceptorService {

    @UseInterceptors( FileInterceptor('file', {
        fileFilter: fileFilter,
        limits: { fileSize: 1000000},
        storage: diskStorage({
          destination: './static/users',
          filename: fileNamer
        })
    }) )
    uploadFiles( @UploadedFile() file: Express.Multer.File,){
        
        if(!file) {
            throw new BadRequestException('Make sure that the file is a image')
        }
        
        const secureUrl = `${ process.env.HOST_API }/files/user/${file.filename}`
        
        return {secureUrl,};

    }


    async getStaticUserAvatar(avatar: string) {

        const path = join(__dirname, '../../static/avatars', avatar);
    
        if( !existsSync(path) ) {
          throw new BadRequestException(`Not product found with image ${avatar}`);
        }
    
        return path;
      }

}
