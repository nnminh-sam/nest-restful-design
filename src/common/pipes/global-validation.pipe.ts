import {
  BadRequestException,
  ValidationPipe,
  ValidationPipeOptions,
} from '@nestjs/common';

export class GlobalValidationPipe extends ValidationPipe {
  constructor(options?: ValidationPipeOptions) {
    super({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      exceptionFactory: (errors) => {
        const details = errors.map((error: any) => ({
          field: error.property,
          message: Object.values(error.constraints).join(', '),
        }));
        throw new BadRequestException({
          error: 'Bad Request',
          message: 'Request produces validation errors',
          details,
        });
      },
      ...options,
    });
  }
}
