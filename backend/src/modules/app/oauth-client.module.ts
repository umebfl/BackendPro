import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OAuthClientController } from './oauth-client.controller';
import { OAuthClientService } from './oauth-client.service';
import { OAuthClient, OAuthClientSchema } from './oauth-client.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OAuthClient.name, schema: OAuthClientSchema },
    ]),
  ],
  controllers: [OAuthClientController],
  providers: [OAuthClientService],
  exports: [OAuthClientService],
})
export class OAuthClientModule {}
