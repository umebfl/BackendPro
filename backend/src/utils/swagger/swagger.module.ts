import { Module } from '@nestjs/common';
import {
  SwaggerModule as NestSwaggerModule,
  DocumentBuilder,
} from '@nestjs/swagger';

@Module({})
export class SwaggerConfigModule {
  static setup(app: any) {
    const config = new DocumentBuilder()
      .setTitle('Core API')
      .setDescription('The core API description')
      .setVersion('1.0')
      .build();
    const document = NestSwaggerModule.createDocument(app, config);
    NestSwaggerModule.setup('api', app, document, {
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
  }
}
