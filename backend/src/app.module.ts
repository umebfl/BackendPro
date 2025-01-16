import { Module } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoreModule } from './core/core.module';
import { SwaggerConfigModule } from './swagger/swagger.module';
import { LoggingModule } from '@/logging/logging.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/ai'),
    LoggingModule,
    CoreModule,
    SwaggerConfigModule,
    UserModule,
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule {}
