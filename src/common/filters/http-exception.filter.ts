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
    const message =
      typeof errorResponse === 'string'
        ? errorResponse
        : (errorResponse as any).message || 'Internal server error';

    this.logger.error(
      `${request.method} ${request.url} - ${status} - ${message}`,
      exception.stack,
    );

    // TODO(dev: nnminh): Review error details structure [LOW]
    const body: HttpErrorResponseDto = {
      path: request.path,
      timestamp: new Date().toISOString(),
      statusCode: status,
      message,
      error: errorResponse.error,
      ...(typeof errorResponse === 'object' && { details: errorResponse }),
    };
    response.status(status).json(body);
  }
}
