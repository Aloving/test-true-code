import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';
import { initSwagger } from './initSwagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
    cors: true,
    bodyParser: true,
  });
  app.setGlobalPrefix('api');

  initSwagger(app);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
