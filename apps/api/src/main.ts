import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { PORT } from '../../../config/constants';
import { AppModule } from './app.module';
import { initSwagger } from './app.swagger';

async function main(): Promise<void> {
	const app = await NestFactory.create(AppModule);
	const logger = new Logger('main');
	const config = app.get(ConfigService);
	const port = parseInt(config.get<string>(PORT), 10) || 3000;
	
	initSwagger(app);

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true
		})
	);

	app.setGlobalPrefix('api');

	app.enableCors({
		origin: 'http://localhost:4200',
		credentials: true
	});
	await app.listen(port);
	logger.log(`App running on port ${await app.getUrl()}`);	
}

main();
