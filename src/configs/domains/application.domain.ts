import { registerAs } from '@nestjs/config';
import { DomainEnum } from 'src/configs/enums/domain.enum';
import { IAppConfig } from 'src/configs/interfaces/application-config.interface';

export const ApplicationConfiguration = registerAs(
  DomainEnum.APP,
  (): IAppConfig[DomainEnum.APP] => ({
    name: process.env.NAME,
    port: parseInt(process.env.PORT, 10),
    host: process.env.HOST,
    apiPrefix: process.env.API_PREFIX,
  }),
);
