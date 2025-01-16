import { Controller, Get, Inject } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

import { CoreService } from '@/modules/core/core.service';

@ApiTags('Core')
@Controller()
export class CoreController {
  constructor(
    private readonly coreService: CoreService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Get('hello')
  @ApiOperation({ summary: 'Get hello message' })
  @ApiResponse({ status: 200, description: 'Returns hello message' })
  getHello(): string {
    this.logger.info('Hello endpoint called');
    this.logger.debug('Hello endpoint called test');
    return this.coreService.getHello();
  }

  @Get()
  @ApiOperation({ summary: 'Get root message' })
  @ApiResponse({ status: 200, description: 'Returns root message' })
  getRoot(): string {
    this.logger.info('root called');
    this.logger.debug('root called test');
    return 'Welcome to the API';
  }
}
