import { BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class BaseFilterDto {
  @ApiProperty({
    description: 'Page indicator',
    example: 1,
    default: 1,
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => value || 1)
  page?: number;

  @ApiProperty({
    description: 'Page size',
    example: 10,
    default: 10,
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => value || 10)
  size: number;

  @ApiProperty({
    description: 'Field name which the resource is ordered by',
    example: 'id',
    default: 'id',
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value || 'id')
  orderBy: string;

  @ApiProperty({
    description: 'Sorting order, asc or desc',
    example: 'asc',
    default: 'asc',
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => {
    if (!['asc', 'desc'].includes(value.toLocaleLowerCase())) {
      throw new BadRequestException('Invalid sort by value');
    }
    return value;
  })
  sortBy: 'asc' | 'desc';
}
