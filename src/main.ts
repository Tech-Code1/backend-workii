import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import supertokens from "supertokens-node"

async function main() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

main();
