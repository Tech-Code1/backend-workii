import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ApplicationWorkii } from '../../aplication_workii/entities/application_workii.entity';
import { User } from '../../users/users.entity';
import { Workii } from '../../workiis/entities/workiis.entity';
dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
	type: 'postgres',
	host: process.env.DB_HOST,
	port: +process.env.DB_PORT! || 5432,
	database: process.env.DB_NAME,
	username: process.env.DB_USER,
	password: process.env.DB_PASS,
	//entities: ['dist/**/*.entity.{ts,js}'],  linux config entities
	entities: [User, Workii, ApplicationWorkii],
	migrations: ['dist/shared/typeorm/migrations/*.js'],
	synchronize: true
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
