import { Module } from '@nestjs/common';
import { AppConfigModule } from 'src/configs';
import { SampleModule } from './modules/sample/sample.module';

@Module({
  imports: [AppConfigModule, SampleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
