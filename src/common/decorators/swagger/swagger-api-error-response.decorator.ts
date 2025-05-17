import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { HttpErrorResponseDto } from '../../dtos/http-error-response.dto';

/**
 * Payload for configuring a client error API response.
 */
export class SwaggerApiErrorResponsePayload {
  /** The HTTP status code for the error response */
  statusCode: number;

  /** A description of the error response */
  description: string;
}

/**
 * Decorator for defining a standardized client error API response.
 * @param status The HTTP status code for the response.
 * @param description A description of the error response.
 */
export const SwaggerApiErrorResponse = (options: {
  statusCode: number;
  description: string;
}) => {
  return applyDecorators(
    ApiResponse({
      status: options.statusCode,
      description: options.description,
      type: HttpErrorResponseDto,
    }),
  );
};
