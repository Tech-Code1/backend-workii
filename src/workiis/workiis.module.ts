import { Module } from '@nestjs/common';
import { WorkiisController } from './workiis.controller';
import { WorkiisService } from './workiis.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workii } from './entities/workiis.entity';
import { Url } from 'src/url/url.entity';

@Module({
  controllers: [WorkiisController],
  providers: [WorkiisService],
  exports: [
    WorkiisService
  ],
  imports: [
    TypeOrmModule.forFeature([Workii])
  ]
})
export class WorkiisModule {}
