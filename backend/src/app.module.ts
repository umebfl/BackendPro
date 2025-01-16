import { Module } from '@nestjs/common';
import { Logger } from '@nestjs/common';

import { CoreModule } from './core/core.module';
import { SwaggerConfigModule } from './swagger/swagger.module';
import { LoggingModule } from '@/logging/logging.module';

@Module({
  imports: [LoggingModule, CoreModule, SwaggerConfigModule],
  controllers: [],
  providers: [Logger],
})
export class AppModule {}
