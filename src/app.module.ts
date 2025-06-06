import { Module } from '@nestjs/common';
import { SampleModule } from './modules/sample/sample.module';
import { EnvironmentModule } from 'src/configs/environment.module';

@Module({
  imports: [EnvironmentModule, SampleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
