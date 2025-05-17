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
        console.log(
          '🚀 ~ GlobalValidationPipe ~ constructor ~ errors:',
          errors,
        );
        if (errors.length < 2) {
          const firstError: string = Object.values(
            errors[0]?.constraints || '',
          ).join(', ');

          throw new BadRequestException(firstError);
        }

        const details = errors.map((error: any) => ({
          field: error.property,
          message: Object.values(error.constraints).join(', '),
        }));
        throw new BadRequestException({
          message: 'Invalid request',
          details,
        });
      },
      ...options,
    });
  }
}
