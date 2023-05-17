import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function main() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('main');

  const options = new DocumentBuilder()
    .setTitle('Workii REST API')
    .setDescription('API REST of Workii')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true,
  });
  await app.listen(process.env.PORT || 3000);
  logger.log(`App running on port ${process.env.PORT || 3000}`);
}

main();
