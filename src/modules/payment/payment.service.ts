import { Injectable, Logger, Inject } from '@nestjs/common';
import { IPayment } from 'src/modules/payment/interfaces/payment.interface';
import { CreatePaymentDto } from 'src/modules/payment/dtos/create-payment.dto';
import { PaymentRepository } from 'src/modules/payment/payment.repository';

@Injectable()
export class PaymentService implements IPayment {
  private logger: Logger = new Logger(PaymentService.name);

  constructor(private readonly paymentRepository: PaymentRepository) {}

  async createPayment(createPaymentDto: CreatePaymentDto) {
    return await this.paymentRepository.createPayment(createPaymentDto);
  }
}
