import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dtos/create-payment.dto';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerApiSuccessResponse } from 'src/common/decorators/swagger/swagger-api-success-response.decorator';
import { SwaggerApiErrorResponse } from 'src/common/decorators/swagger/swagger-api-error-response.decorator';
import { ResponseDto } from 'src/common/dtos/response.dto';

@ApiTags('Payment')
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @SwaggerApiSuccessResponse({
    description: 'Create a new payment',
    statusCode: 201,
    sampleMessage: 'Payment created successfully',
  })
  @SwaggerApiErrorResponse({
    statusCode: 400,
    description: 'Invalid payment data',
  })
  @SwaggerApiErrorResponse({
    statusCode: 401,
    description: 'Unauthorized request',
  })
  @SwaggerApiErrorResponse({
    statusCode: 403,
    description: 'Forbidden request',
  })
  @SwaggerApiErrorResponse({
    statusCode: 500,
    description: 'Failed to create payment',
  })
  @Post()
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    const response = await this.paymentService.createPayment(createPaymentDto);
    return ResponseDto.builder()
      .data(response)
      .statusCode(201)
      .message('Payment created successfully')
      .build();
  }
}
