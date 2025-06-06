import { ConfigModule } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { ApplicationConfig } from './application-config';

function validate(config: Record<string, unknown>): ApplicationConfig {
  const validatedConfig = plainToInstance(ApplicationConfig, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}

const AppConfigModule = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: ['.env'],
  validate,
});

export { AppConfigModule };
