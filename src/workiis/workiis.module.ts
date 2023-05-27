import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationWorkii } from 'src/aplication_workii/entities/application_workii.entity';
import { CommonService } from 'src/common/services/handleExceptions.service';
import { AuthModule } from '../auth/auth.module';
import { User } from '../users/users.entity';
import { Workii } from './entities/workiis.entity';
import { WorkiisController } from './workiis.controller';
import { WorkiisService } from './workiis.service';

@Module({
	controllers: [WorkiisController],
	providers: [WorkiisService, CommonService],
	exports: [WorkiisService],
	imports: [TypeOrmModule.forFeature([Workii, User, ApplicationWorkii]), AuthModule]
})
export class WorkiisModule {}
