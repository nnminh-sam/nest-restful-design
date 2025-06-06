import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentRepository } from 'src/modules/payment/payment.repository';
import { EnvironmentModule } from 'src/configs/environment.module';
import { PaymentController } from './payment.controller';

@Module({
  imports: [EnvironmentModule],
  providers: [PaymentService, PaymentRepository],
  controllers: [PaymentController],
})
export class PaymentModule {}
