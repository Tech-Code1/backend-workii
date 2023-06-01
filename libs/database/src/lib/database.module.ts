import { Module } from '@nestjs/common';

/**
 * DatabaseModule class.
 */
@Module({
	imports: [
		/* TypeOrmModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				...configService.get('database')
			})
		}) */
	]
})
export class DatabaseModule {}
