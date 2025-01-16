import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsArray,
  IsOptional,
} from 'class-validator';

export class CreateOAuthClientDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: false, default: true })
  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  comment?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  appId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  secret: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  department: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  ownerId: string;

  @ApiProperty({ type: [String], required: false, default: [] })
  @IsArray()
  @IsOptional()
  apiScope?: string[];

  @ApiProperty({ type: [String], required: false, default: [] })
  @IsArray()
  @IsOptional()
  tagsScope?: string[];

  @ApiProperty({ required: false, default: false })
  @IsBoolean()
  @IsOptional()
  neededUserId?: boolean;
}
