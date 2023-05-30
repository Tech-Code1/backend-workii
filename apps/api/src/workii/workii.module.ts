import { ApplicationWorkii, User, Workii } from '@db/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CommonService } from '../common/services/handleExceptions.service';
import { WorkiisController } from './workii.controller';
import { WorkiisService } from './workii.service';

@Module({
	controllers: [WorkiisController],
	providers: [WorkiisService, CommonService],
	exports: [WorkiisService],
	imports: [TypeOrmModule.forFeature([Workii, User, ApplicationWorkii]), AuthModule]
})
export class WorkiisModule {}
