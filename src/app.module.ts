import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi'
import { enviroments } from './environments';
import config from './config';
import { any } from 'joi';

@Module({
  imports: [
    AuthModule, 
    ConfigModule.forRoot({
      envFilePath: '.env', 
      load: [config],
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
  exports: []
})
export class AppModule {}
