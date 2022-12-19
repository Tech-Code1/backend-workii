import { Module } from '@nestjs/common';
import { WorkiisController } from './workiis.controller';
import { WorkiisService } from './workiis.service';

@Module({
  controllers: [WorkiisController],
  providers: [WorkiisService]
})
export class WorkiisModule {}
