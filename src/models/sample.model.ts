import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class Sample {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  str: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  num: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  bool: boolean;

  @ApiProperty({
    isArray: true,
  })
  @IsNotEmpty()
  @IsArray()
  arr: string[];
}
