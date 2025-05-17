import { registerAs } from '@nestjs/config';
import { DomainEnum } from 'src/configs/enums/domain.enum';
import { IAppConfig } from 'src/configs/interfaces/application-config.interface';

export const AuthConfiguration = registerAs(
  DomainEnum.AUTH,
  (): IAppConfig[DomainEnum.AUTH] => ({
    jwtSecret: process.env.JWT_SECRET,
    accessTokenExpiration: process.env.ACCESS_TOKEN_EXPIRES_IN,
    refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRES_IN,
  }),
);
