import { Module } from '@nestjs/common';
import { WorkiisController } from './workiis.controller';
import { WorkiisService } from './workiis.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workii } from './entities/workiis.entity';
import { CommonService } from 'src/common/services/handleExceptions.service';
import { User } from '../users/users.entity';
import { AuthModule } from '../auth/auth.module';
import { ApplicationWorkii } from 'src/aplication_workii/entities/application_workii.entity';

@Module({
  controllers: [WorkiisController],
  providers: [WorkiisService, CommonService],
  exports: [WorkiisService],
  imports: [
    TypeOrmModule.forFeature([Workii, User, ApplicationWorkii]),
    AuthModule,
  ],
})
export class WorkiisModule {}
