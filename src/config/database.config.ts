/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { ApplicationWorkii } from '../aplication_workii/entities/application_workii.entity';
import { User } from '../user/entities/user.entity';
import { Workii } from '../workii/entities/workii.entity';
dotenv.config();

function typeormModuleOptions(): TypeOrmModuleOptions {
	return {
		type: 'postgres',
		host: process.env.DB_HOST,
		port: +process.env.DB_PORT! || 5432,
		database: process.env.DB_NAME,
		username: process.env.DB_USER,
		password: process.env.DB_PASS,
		//entities: ['dist/**/*.entity.{ts,js}'],  linux config entities
		entities: [User, Workii, ApplicationWorkii],
		migrationsRun: true,
		migrations: ['dist/shared/typeorm/migrations/*.js'],
		migrationsTableName: 'migrations_typeorm',
		// Activar SOLO MANUALMENTE en DESARROLLO SI ES NECESARIO (DESACTIVAR EN PRODUCCION).
		synchronize: false
		//logging: false,
		//logger: 'file'
	};
}

export default registerAs('database', () => ({
	config: typeormModuleOptions()
}));
