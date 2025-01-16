import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CoreModule } from '@/modules/core/core.module';
import { UserModule } from '@/modules/user/user.module';
import { SwaggerConfigModule } from '@/utils/swagger/swagger.module';
import { LoggingModule } from '@/utils/logging/logging.module';
import { OAuthClientModule } from '@/modules/app/oauth-client.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/ai'),
    LoggingModule,
    CoreModule,
    SwaggerConfigModule,
    UserModule,
    OAuthClientModule,
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule {}
