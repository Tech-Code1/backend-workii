import { Module } from '@nestjs/common';
import { ApplicationWorkiiController } from './application_workii.controller';
import { CommonService } from 'src/common/services/handleExceptions.service';
import { ApplicationWorkiiService } from './application_workii.service';
import { ApplicationWorkii } from './entities/application_workii.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	controllers: [ApplicationWorkiiController],
	providers: [ApplicationWorkiiService, CommonService],
	exports: [ApplicationWorkiiService],
	imports: [TypeOrmModule.forFeature([ApplicationWorkii])]
})
export class ApplicationWorkiiModule {}
