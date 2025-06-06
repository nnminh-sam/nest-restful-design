import { Injectable, Logger } from '@nestjs/common';
import { CreatePaymentDto } from 'src/modules/payment/dtos/create-payment.dto';
import { EnvironmentService } from 'src/configs/environment.service';
import * as retry from 'async-retry';
import { ApiError, Client, CreatePaymentRequest, Money } from 'square';

@Injectable()
export class PaymentRepository {
  private logger: Logger = new Logger(PaymentRepository.name);
  private readonly squareClient: Client;

  constructor(private readonly environmentService: EnvironmentService) {
    this.logger.log('Square Client Initialized');
    this.squareClient = new Client({
      environment: this.environmentService.use('SQUARE_ENVIRONMENT'),
      accessToken: this.environmentService.use('SQUARE_ACCESS_TOKEN'),
    });
  }

  async createPayment(createPaymentDto: CreatePaymentDto) {
    const DEFAULT_PAYMENT_AMOUNT_IN_CENT: bigint = BigInt(100);

    return await retry(
      async (bail: (e: unknown) => void, attempt: number) => {
        try {
          const amountMoney: Money = {
            currency: 'USD',
            amount: createPaymentDto?.amount
              ? BigInt(createPaymentDto.amount)
              : DEFAULT_PAYMENT_AMOUNT_IN_CENT,
          };
          const payload: CreatePaymentRequest = {
            sourceId: createPaymentDto.sourceId,
            locationId: createPaymentDto.locationId,
            idempotencyKey: createPaymentDto.idempotencyKey,
            amountMoney,
            ...(createPaymentDto?.customerId && {
              customerId: createPaymentDto.customerId,
            }),
            ...(createPaymentDto?.verificationToken && {
              verificationToken: createPaymentDto.verificationToken,
            }),
          };
          const { result, statusCode } =
            await this.squareClient.paymentsApi.createPayment(payload);
          console.log('🚀 ~ PaymentRepository ~ statusCode:', statusCode);
          console.log('🚀 ~ PaymentRepository ~ result:', result);
        } catch (exception) {
          if (exception instanceof ApiError) {
            console.log('Square error instance');
            this.logger.error(exception.errors);
            bail(exception);
          } else {
            console.log('General Error');
            this.logger.error(
              `Error creating payment on attempt ${attempt}: ${exception}`,
            );
            throw exception;
          }
        }
      },
      {
        retries: 3,
        factor: 2,
        minTimeout: 1000,
        maxTimeout: 5000,
      },
    );
  }
}
