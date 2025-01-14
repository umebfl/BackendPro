import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { BootstrapModule } from './bootstrap/bootstrap.module';

@Module({
  imports: [BootstrapModule, CoreModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
