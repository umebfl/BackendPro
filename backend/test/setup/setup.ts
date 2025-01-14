import { Test } from '@nestjs/testing';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export async function setupSwagger(app) {
  const config = new DocumentBuilder()
    .setTitle('Core API')
    .setDescription('The core API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
