import { applyDecorators, Type, UseInterceptors } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dtos/response.dto';
import { PaginationDto } from 'src/common/dtos/pagination-response.dto';
import { ApiResponseWrapperInterceptor } from 'src/common/interceptors/api-response-wrapper.interceptor';
import { HttpResponseDto } from 'src/common/dtos/http-response.dto';

/**
 * Payload for configuring a successful API response.
 * @template TModel The model type for the response data.
 */
export class SwaggerApiSuccessResponsePayload<TModel extends Type<any>> {
  /** The data type to be used in the response */
  dataType?: TModel;

  /** The key under which the response data is stored */
  key?: string;

  /** A description of the API response */
  description: string;

  /** Specifies if the response contains an array of the model */
  isArray?: boolean;

  /** Specifies the sucess status code */
  statusCode?: number;

  /** Specifies optional value for message key */
  sampleMessage?: string;
}

/**
 * Decorator for defining a standardized successful API response.
 * @template TModel The model type for the response.
 * @param dataType The data type to be returned in the response.
 * @param key The key under which the response data is stored.
 * @param description A description of the response.
 * @param isArray Whether the response should be an array of the model.
 * @param statusCode Response status code
 * @param sampleMessage Optional example value of message key.
 */
export const SwaggerApiSuccessResponse = <TModel extends Type<any>>({
  dataType,
  key,
  description,
  isArray = false,
  statusCode = 200,
  sampleMessage,
}: SwaggerApiSuccessResponsePayload<TModel>) => {
  const extraModels = [ResponseDto, PaginationDto, HttpResponseDto];
  if (dataType) extraModels.push(dataType);

  const schema: any = {
    allOf: [
      { $ref: getSchemaPath(HttpResponseDto) },
      {
        properties: {
          ...(statusCode && {
            statusCode: {
              example: statusCode,
            },
          }),
          ...(dataType &&
            key && {
              [key]: isArray
                ? {
                    type: 'array',
                    items: { $ref: getSchemaPath(dataType) },
                  }
                : { $ref: getSchemaPath(dataType) },
            }),
          ...(isArray && {
            pagination: {
              $ref: getSchemaPath(PaginationDto),
            },
          }),
          ...(sampleMessage && {
            message: {
              example: sampleMessage,
            },
          }),
        },
      },
    ],
  };

  let responseDecorator = null;
  switch (statusCode) {
    case 201:
      responseDecorator = ApiCreatedResponse({
        description,
        schema,
      });
      break;

    default:
      responseDecorator = ApiOkResponse({
        description,
        schema,
      });
      break;
  }

  return applyDecorators(
    ApiExtraModels(...extraModels),
    responseDecorator,
    UseInterceptors(new ApiResponseWrapperInterceptor(key)),
  );
};
