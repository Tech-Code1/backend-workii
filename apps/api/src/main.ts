import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { PORT } from '../../../config/constants';
import { AppModule } from './app.module';
//import generateTypeormConfigFile from './scripts/generate-typeorm-config-file';

async function main(): Promise<void> {
	const app = await NestFactory.create(AppModule);
	const logger = new Logger('main');
	const config = app.get(ConfigService);
	const port = parseInt(config.get<string>(PORT), 10) || 3000;
	const options = new DocumentBuilder()
		.setTitle('Workii REST API')
		.setDescription('API REST of Workii')
		.setVersion('1.0')
		.addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' }, 'access-token')
		.build();
	const document = SwaggerModule.createDocument(app, options);

	SwaggerModule.setup('api', app, document);
	//generateTypeormConfigFile(config);

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
