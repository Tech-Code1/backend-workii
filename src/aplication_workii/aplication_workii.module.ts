import { Module } from '@nestjs/common';
import { AplicationWorkiiService } from './aplication_workii.service';
import { AplicationWorkiiController } from './aplication_workii.controller';

@Module({
  controllers: [AplicationWorkiiController],
  providers: [AplicationWorkiiService]
})
export class AplicationWorkiiModule {}
