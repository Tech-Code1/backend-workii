import { Module } from '@nestjs/common';
import { WorkiisController } from './workiis.controller';
import { WorkiisService } from './workiis.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workii } from './entities/workiis.entity';
import { CommonService } from 'src/common/common.service';

@Module({
  controllers: [WorkiisController],
  providers: [WorkiisService, CommonService],
  exports: [
    WorkiisService
  ],
  imports: [
    TypeOrmModule.forFeature([Workii])
  ]
})
export class WorkiisModule {}
