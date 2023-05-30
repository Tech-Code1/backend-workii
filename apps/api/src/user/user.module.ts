import { User, Workii } from '@db/entities';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CommonService } from '../common/services/handleExceptions.service';
import { FileInterceptorService } from '../common/services/uploadFiles.service';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';

@Module({
	controllers: [UsersController],
	providers: [UsersService, CommonService, FileInterceptorService],
	exports: [UsersService],
	imports: [TypeOrmModule.forFeature([User, Workii]), AuthModule, JwtModule]
})
export class UsersModule {}
