import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsArray, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateOAuthClientDto } from './create-oauth-client.dto';

export class UpdateOAuthClientDto extends PartialType(CreateOAuthClientDto) {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  comment?: string;

  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  apiScope?: string[];

  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  tagsScope?: string[];

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  neededUserId?: boolean;
}
