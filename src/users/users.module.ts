import { Module } from '@nestjs/common';
import { AuthController } from 'src/auth/auth.controller';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService
  ],
  exports: [
    UsersService
  ]
})
export class UsersModule {}
