/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';
import { WorkiisModule } from './workii/workii.module';
//import { SeedModule } from './seed/seed.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import Joi from 'joi';
import { join } from 'path';
import { ApplicationWorkiiModule } from './aplication_workii/application_workii.module';
import { ChatModule } from './chat/chat.module';
import { CommonModule } from './common/common.module';
import { TYPEORM_CONFIG } from './config/constants';
import databaseConfig from './config/database.config';
import { FilesModule } from './files/files.module';
@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (config: ConfigService) => config.get<TypeOrmModuleOptions>(TYPEORM_CONFIG)!
		}),
		ConfigModule.forRoot({
			isGlobal: true,
			load: [databaseConfig],
			envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
			validationSchema: Joi.object({
				NODE_ENV: Joi.string().valid('development', 'production').default('development')
			})
		}),
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
