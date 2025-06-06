import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from 'src/configs/environment-variable';
import { EnvironmentService } from 'src/configs/environment.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      validate,
    }),
  ],
  exports: [EnvironmentService],
  providers: [EnvironmentService],
})
export class EnvironmentModule {}
