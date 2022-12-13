import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import config from './config';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    AuthModule, 
    ConfigModule.forRoot({
      envFilePath: '.env', 
      load: [config],
      isGlobal: true,
    }), 
    UsersModule,
  ],
  controllers: [],
  providers: [],
  exports: []
})
export class AppModule {}
