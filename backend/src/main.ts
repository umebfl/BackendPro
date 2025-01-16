import { NestFactory } from '@nestjs/core';
import { SwaggerConfigModule } from './swagger/swagger.module';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  SwaggerConfigModule.setup(app);
  await app.listen(process.env.PORT || 3777);
}
bootstrap();
