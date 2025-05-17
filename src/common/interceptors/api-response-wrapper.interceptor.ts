import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { map, Observable, timestamp } from 'rxjs';
import { HttpResponseDto } from 'src/common/dtos/http-response.dto';
import { ResponseDto } from 'src/common/dtos/response.dto';

@Injectable()
export class ApiResponseWrapperInterceptor implements NestInterceptor {
  constructor(private readonly key: string = 'data') {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next
      .handle()
      .pipe(map((data) => wrapResponse({ key: this.key, data, context })));
  }
}

const wrapResponse = ({ key, data, context }: any) => {
  const request: Request = context.switchToHttp().getRequest();
  const response: Response = context.switchToHttp().getResponse();
  const isStringData = typeof data === 'string';

  if (data instanceof ResponseDto) {
    const result = {
      path: request.path,
      timestamp: new Date().toISOString(),
      statusCode: data?.statusCode || response.statusCode,
      message: data?.message || response.statusMessage,
      [key]: data.data,
      ...(data?.pagination && {
        pagination: data.pagination,
      }),
    };
    return result;
  }

  const result: HttpResponseDto = {
    path: request.path,
    timestamp: new Date().toISOString(),
    statusCode: response.statusCode,
    message: isStringData ? data : 'Success',
  };
  return result;
};
