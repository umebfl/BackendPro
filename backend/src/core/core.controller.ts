import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreService } from './core.service';

@ApiTags('Core')
@Controller()
export class CoreController {
  constructor(private readonly coreService: CoreService) {}

  @Get('hello')
  @ApiOperation({ summary: 'Get hello message' })
  @ApiResponse({ status: 200, description: 'Returns hello message' })
  getHello(): string {
    return this.coreService.getHello();
  }

  @Get()
  @ApiOperation({ summary: 'Get root message' })
  @ApiResponse({ status: 200, description: 'Returns root message' })
  getRoot(): string {
    return 'Welcome to the API';
  }
}
