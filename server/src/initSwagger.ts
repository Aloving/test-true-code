import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function initSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('True Code examples')
    .setDescription('True Code examples description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
}
