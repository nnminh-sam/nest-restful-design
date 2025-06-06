import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class ApplicationConfig {
  @IsString()
  @IsOptional()
  NAME?: string = 'NestJS Application';

  @IsString()
  @IsOptional()
  HOST?: string = 'localhost';

  // * For production, I suggess validate this as is not empty
  @IsNumber()
  @IsOptional()
  PORT?: number = 3120;

  @IsString()
  @IsOptional()
  API_PREFIX?: string = 'api';

  @IsString()
  @IsNotEmpty({ message: 'JWT_SECRET is required in environment variable' })
  @MinLength(12, { message: 'Min lenght for JWT_SECRET is 12 characters' })
  JWT_SECRET: string;

  @IsString()
  @IsOptional()
  ACCESS_TOKEN_EXPIRES_IN: string = '1h';

  @IsString()
  @IsOptional()
  REFRESH_TOKEN_EXPIRES_IN: string = '1d';
}
