/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
dotenv.config();

import InitSeeder from '../libs/database/seeders/init.seeder';

ConfigModule.forRoot({
  envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
});


export const options = {
		type: 'postgres',
		host: String(process.env.DB_HOST),
		port: parseInt(String(process.env.DB_PORT), 10) || 5432,
		database: String(process.env.DB_NAME),
		username: String(process.env.DB_USER),
		password: String(process.env.DB_PASS),
		entities: [join(__dirname, '/libs/database/src/lib/entities/**/*.entity.ts')],
		migrationsRun: true,
		migrations: [join(__dirname, '/../libs/database/migrations/**/*.ts')],
		migrationsTableName: 'migrations',
		seeds: [InitSeeder],
		// Activar SOLO MANUALMENTE en DESARROLLO SI ES NECESARIO (DESACTIVAR EN PRODUCCION).
		synchronize: false
		//logging: false,
		//logger: 'file'
};

export const dataSource = new DataSource(
	options as DataSourceOptions & SeederOptions,
);