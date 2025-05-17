import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { ApplicationConfiguration } from 'src/configs/domains/application.domain';
import { AuthConfiguration } from 'src/configs/domains/auth.domain';
import { DomainEnum } from 'src/configs/enums/domain.enum';
import { IAppConfig } from 'src/configs/interfaces/application-config.interface';

const validationSchema: Joi.ObjectSchema<IAppConfig> = Joi.object({
  // App domain validation
  NAME: Joi.string().default('Application'),
  HOST: Joi.string().default('localhost'),
  PORT: Joi.number().default(3000),
  API_PREFIX: Joi.string().default('api'),
  // Authentication domain validation
  JWT_SECRET: Joi.string().required(),
  ACCESS_TOKEN_EXPIRES_IN: Joi.string().default('1h'),
  REFRESH_TOKEN_EXPIRES_IN: Joi.string().default('1d'),
});

const DomainRegistraions: any[] = [ApplicationConfiguration, AuthConfiguration];

const AppConfigModule = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: ['.env'],
  load: DomainRegistraions,
  validationSchema,
});

export { AppConfigModule, DomainEnum };
