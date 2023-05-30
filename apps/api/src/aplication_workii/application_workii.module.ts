import { ApplicationWorkii } from '@db/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonService } from '../common/services/handleExceptions.service';
import { ApplicationWorkiiController } from './application_workii.controller';
import { ApplicationWorkiiService } from './application_workii.service';

@Module({
	controllers: [ApplicationWorkiiController],
	providers: [ApplicationWorkiiService, CommonService],
	exports: [ApplicationWorkiiService],
	imports: [TypeOrmModule.forFeature([ApplicationWorkii])]
})
export class ApplicationWorkiiModule {}
