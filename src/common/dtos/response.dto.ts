import { HttpResponseDto } from 'src/common/dtos/http-response.dto';
import { PaginationDto } from './pagination-response.dto';
import { PartialType, PickType } from '@nestjs/mapped-types';

export class ResponseDto<T = any> extends PartialType(
  PickType(HttpResponseDto, ['message', 'statusCode']),
) {
  data: T;

  pagination?: PaginationDto;

  constructor();

  constructor(data: T);

  constructor(data: T, message: string);

  constructor(data: T, statusCode: number);

  constructor(data: T, pagination: PaginationDto);

  constructor(data?: T, secondParam?: string | number | PaginationDto) {
    super();

    this.statusCode = 200;
    this.message = 'Success';

    if (data) {
      this.data = data;
    }

    if (typeof secondParam === 'object') {
      this.pagination = secondParam;
    } else if (typeof secondParam === 'number') {
      this.statusCode = secondParam;
    } else if (typeof secondParam === 'string') {
      this.message = secondParam;
    }
  }

  static builder<T = any>() {
    return new ResponseDtoBuilder<T>();
  }
}

class ResponseDtoBuilder<T = any> {
  private readonly response = new ResponseDto<T>();

  constructor() {}

  data(data: T): this {
    this.response.data = data;
    return this;
  }

  message(message: string): this {
    this.response.message = message;
    return this;
  }

  statusCode(statusCode: number): this {
    this.response.statusCode = statusCode;
    return this;
  }

  pagination(pagination: PaginationDto): this {
    this.response.pagination = pagination;
    return this;
  }

  build(): ResponseDto<T> {
    if (!this.response.message) {
      this.response.message = 'Sucess';
    }
    return this.response;
  }
}
