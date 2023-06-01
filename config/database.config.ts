import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

function TypeOrmModuleOptions(): TypeOrmModuleOptions {
    return {
        type: "postgres",
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT!, 10),
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        entities: [join(__dirname, '/../libs/database/src/lib/entities/**/*.entity.ts')],
        autoLoadEntities: true,
        migrations: [join(__dirname, '/../libs/database/migrations/**/*.ts')],
        migrationsTableName: 'migrations',
        migrationsRun: true,

        // * Activar solo manualmente en desarrollo si es necesario
        synchronize: false,
        logging: false,
        //logger: 'file'
    }
}

export default registerAs('database', () => ({
    config: TypeOrmModuleOptions()
}));
