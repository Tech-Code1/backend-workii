import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationWorkii } from 'src/aplication_workii/entities/application_workii.entity';
import { CommonService } from 'src/common/services/handleExceptions.service';
import { AuthModule } from '../auth/auth.module';
import { User } from '../user/entities/user.entity';
import { Workii } from './entities/workii.entity';
import { WorkiisController } from './workii.controller';
import { WorkiisService } from './workii.service';

@Module({
	controllers: [WorkiisController],
	providers: [WorkiisService, CommonService],
	exports: [WorkiisService],
	imports: [TypeOrmModule.forFeature([Workii, User, ApplicationWorkii]), AuthModule]
})
export class WorkiisModule {}
