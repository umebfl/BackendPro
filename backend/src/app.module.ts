import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { BootstrapModule } from './bootstrap/bootstrap.module';
import { SwaggerConfigModule } from './swagger/swagger.module';

@Module({
  imports: [BootstrapModule, CoreModule, SwaggerConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
