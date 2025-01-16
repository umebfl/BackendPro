import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { OAuthClientService } from './oauth-client.service';
import { CreateOAuthClientDto } from './dto/create-oauth-client.dto';
import { UpdateOAuthClientDto } from './dto/update-oauth-client.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('OAuth Clients')
@Controller('oauth-clients')
export class OAuthClientController {
  constructor(private readonly oauthClientService: OAuthClientService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new OAuth client' })
  @ApiResponse({ status: 201, description: 'Client created successfully' })
  async create(@Body() createOAuthClientDto: CreateOAuthClientDto) {
    return this.oauthClientService.create(createOAuthClientDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all OAuth clients' })
  @ApiResponse({ status: 200, description: 'List of all clients' })
  async findAll() {
    return this.oauthClientService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get OAuth client by ID' })
  @ApiResponse({ status: 200, description: 'Client details' })
  async findOne(@Param('id') id: string) {
    return this.oauthClientService.findOne(id);
  }

  @Get('by-app-id/:appId')
  @ApiOperation({ summary: 'Get OAuth client by appId' })
  @ApiResponse({ status: 200, description: 'Client details' })
  async findByAppId(@Param('appId') appId: string) {
    return this.oauthClientService.findByAppId(appId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update OAuth client' })
  @ApiResponse({ status: 200, description: 'Client updated successfully' })
  async update(
    @Param('id') id: string,
    @Body() updateOAuthClientDto: UpdateOAuthClientDto,
  ) {
    return this.oauthClientService.update(id, updateOAuthClientDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete OAuth client' })
  @ApiResponse({ status: 200, description: 'Client deleted successfully' })
  async remove(@Param('id') id: string) {
    return this.oauthClientService.remove(id);
  }
}
