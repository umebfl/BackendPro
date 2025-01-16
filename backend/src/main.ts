import { NestFactory } from '@nestjs/core';
import { log } from 'console';

import { AppModule } from '@/app.module';
import { SwaggerConfigModule } from '@/utils/swagger/swagger.module';

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
