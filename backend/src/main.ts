import { NestFactory } from '@nestjs/core';
import { SwaggerConfigModule } from './swagger/swagger.module';
import { AppModule } from './app.module';
import { log } from 'console';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.enableCors();

  SwaggerConfigModule.setup(app);
  await app.listen(process.env.PORT || 3777);
  log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
