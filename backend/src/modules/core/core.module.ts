import { Module } from '@nestjs/common';

import { CoreService } from '@/modules/core/core.service';
import { CoreController } from '@/modules/core/core.controller';

@Module({
  controllers: [CoreController],
  providers: [CoreService],
})
export class CoreModule {}
