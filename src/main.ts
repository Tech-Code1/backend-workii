import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function main() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder() 
    .setTitle('Bookstore REST API')
    .setDescription('API REST de Bookstore')
    .setVersion('1.0')
    .addBearerAuth( 
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
      'access-token', 
    )
    .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}

main();
