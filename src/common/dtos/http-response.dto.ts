import { ApiProperty } from '@nestjs/swagger';

export class HttpResponseDto {
  @ApiProperty({
    description: 'Request path',
    example: '/api/v1/resource',
  })
  path: string;

  @ApiProperty({
    description: 'API response timestamp',
    example: '2025-05-17T16:44:02.123Z',
  })
  timestamp: string;

  @ApiProperty({
    description: 'HTTP status code',
    example: 200,
  })
  statusCode: number;

  @ApiProperty({
    description: 'API response message',
    example: 'This is sample message',
  })
  message: string;
}
