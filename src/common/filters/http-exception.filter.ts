import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { HttpErrorResponseDto } from 'src/common/dtos/http-error-response.dto';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const errorResponse: any = exception.getResponse();
    const message: string = errorResponse?.message || 'Internal Server Error';
    const error: string = errorResponse?.error || message;

    this.logger.error(`${request.method} ${request.url} - ${status}`);
    this.logger.error('Error details:', errorResponse?.details);
    this.logger.error(exception.stack);

    const body: HttpErrorResponseDto = {
      path: request.path,
      timestamp: new Date().toISOString(),
      statusCode: status,
      message,
      error,
      ...(errorResponse?.details && { details: errorResponse.details }),
    };
    response.status(status).json(body);
  }
}
