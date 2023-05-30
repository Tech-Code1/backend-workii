/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';
import { WorkiisModule } from './workii/workii.module';
//import { SeedModule } from './seed/seed.module';
import { ServeStaticModule } from '@nestjs/serve-static';

import { join } from 'path';
import { ApplicationWorkiiModule } from './aplication_workii/application_workii.module';
import { ChatModule } from './chat/chat.module';
import { CommonModule } from './common/common.module';
//import { TYPEORM_CONFIG } from './config/constants';
//import databaseConfig from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configs } from '../../../config/apps.config';
import { ApplicationWorkii, DatabaseModule, User, Workii } from '../../../libs/database/src';
import { FilesModule } from './files/files.module';
import { validation } from './shared/utils/validationSchema';
import Joi = require('joi');
@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
			isGlobal: true,
			load: [configs],
			validationSchema: Joi.object<typeof validation>(validation)
		}),
		DatabaseModule,
		TypeOrmModule.forFeature([
			User, Workii, ApplicationWorkii
		]),
		AuthModule,
		UsersModule,
		WorkiisModule,
		CommonModule,
		FilesModule,
		ChatModule,
		ApplicationWorkiiModule,
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'static'),
			serveRoot: '/static'
		})
	],
	controllers: [],
	providers: [],
	exports: []
})
export class AppModule {}
