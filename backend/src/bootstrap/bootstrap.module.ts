import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Logger } from '@nestjs/common';

import { LoggingModule } from '@/logging/logging.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
    }),
    LoggingModule,
  ],
  providers: [Logger],
})
export class BootstrapModule {
  static async createApp() {
    const { AppModule } = await import('@/app.module');
    const { NestFactory } = await import('@nestjs/core');

    const app = await NestFactory.create(AppModule, {
      bufferLogs: true,
    });

    app.enableCors();

    return app;
  }
}
