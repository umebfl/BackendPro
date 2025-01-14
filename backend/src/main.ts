import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Core API')
    .setDescription('The core API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customCss: `
      .swagger-ui .topbar { display: none }
    `,
    customSiteTitle: 'Core API',
    jsonDocumentUrl: '/api-json',
    swaggerOptions: {
      defaultModelsExpandDepth: -1,
      docExpansion: 'none',
      filter: true,
      showRequestDuration: true,
    },
  });

  await app.listen(process.env.PORT || 7000);
}
bootstrap();
