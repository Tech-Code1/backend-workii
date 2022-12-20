/* import { Module } from '@nestjs/common';
//import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { Url } from './url.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  //providers: [UrlService],
  controllers: [UrlController],
  imports: [
    TypeOrmModule.forFeature([Url])
  ]
})
export class UrlModule {}
 */