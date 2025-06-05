import { Module } from '@nestjs/common';
import { AppConfigModule } from 'src/configs';
import { SampleModule } from './modules/sample/sample.module';
import { PaymentModule } from './modules/payment/payment.module';

@Module({
  imports: [AppConfigModule, SampleModule, PaymentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
