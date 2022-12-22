import { Module } from '@nestjs/common';
import { AuthController } from 'src/auth/auth.controller';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { User } from './users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonService } from 'src/common/services/handleExceptions.service';
import { Workii } from '../workiis/entities/workiis.entity';
import { FileInterceptorService } from 'src/common/services/uploadFiles.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    CommonService,
    FileInterceptorService
  ],
  exports: [
    UsersService
  ],
  imports: [
    TypeOrmModule.forFeature([User, Workii]),
    AuthModule
  ]
})
export class UsersModule {}
