import { Module } from '@nestjs/common';
import { SampleModule } from './modules/sample/sample.module';
import { PaymentModule } from './modules/payment/payment.module';
import { EnvironmentModule } from 'src/configs/environment.module';

@Module({
  imports: [EnvironmentModule, SampleModule, PaymentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
