import { Module } from '@nestjs/common';
import { AuthController } from 'src/auth/auth.controller';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { User } from './users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonService } from 'src/common/common.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    CommonService
  ],
  exports: [
    UsersService
  ],
  imports: [
    TypeOrmModule.forFeature([User]),
    AuthModule
  ]
})
export class UsersModule {}
