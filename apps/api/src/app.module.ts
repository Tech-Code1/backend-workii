import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import Joi from 'joi';
import { join } from 'path';
import { configs } from '../../../config/apps.config';
import { NODE_ENV, TYPEORM_CONFIG } from '../../../config/constants';
import { DatabaseModule } from '../../../libs/database/src';
import { ApplicationWorkiiModule, AuthModule, ChatModule, CommonModule, FilesModule, UsersModule, WorkiisModule } from './index';
import { validation } from './shared/utils/validationSchema';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({...configService.get(TYPEORM_CONFIG)}),
		}),
		ConfigModule.forRoot({
			isGlobal: true,
			load: [configs],
			envFilePath: `.env.${NODE_ENV || 'development'}`,
			validationSchema: Joi.object<typeof validation>(validation)
		}),
		DatabaseModule,
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
