import { ApiProperty } from '@nestjs/swagger';
import { HttpResponseDto } from 'src/common/dtos/http-response.dto';

export class HttpErrorResponseDto extends HttpResponseDto {
  @ApiProperty({
    description: 'Error type',
    example: 'Bad Request',
  })
  error: string;

  @ApiProperty({
    description: 'Additional error details',
    example: {
      message: 'Invalid request',
      details: [
        {
          field: 'field name',
          message: 'error message',
        },
      ],
    },
    required: false,
  })
  details?: any;
}
