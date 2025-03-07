import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { initSwagger } from './initSwagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
    cors: true,
    bodyParser: true,
  });
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  app.setGlobalPrefix('api');

  initSwagger(app);

  await app.listen(port || 3000);
}

bootstrap();
