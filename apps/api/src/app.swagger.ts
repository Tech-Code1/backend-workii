import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const initSwagger = (app: INestApplication) => {
    const options = new DocumentBuilder()
    .setTitle('Workii REST API')
    .setDescription('API REST of Workii')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' }, 'authToken')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('workii/docs', app, document);
};