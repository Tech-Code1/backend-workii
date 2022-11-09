import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import supertokens from "supertokens-node"
import { SupertokensExceptionFilter } from "./auth/auth.filter"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:8080'],
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
  })

  app.useGlobalFilters(new SupertokensExceptionFilter())

  await app.listen(3000);
}
bootstrap();
