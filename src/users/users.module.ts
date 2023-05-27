import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CommonService } from 'src/common/services/handleExceptions.service';
import { FileInterceptorService } from 'src/common/services/uploadFiles.service';
import { Workii } from '../workiis/entities/workiis.entity';
import { UsersController } from './users.controller';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Module({
	controllers: [UsersController],
	providers: [UsersService, CommonService, FileInterceptorService],
	exports: [UsersService],
	imports: [TypeOrmModule.forFeature([User, Workii]), AuthModule, JwtModule]
})
export class UsersModule {}
