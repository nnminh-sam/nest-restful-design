export interface IAppConfig {
  app: {
    name: string;
    host: string;
    port: number;
    apiPrefix: string;
  };
  auth: {
    jwtSecret: string;
    accessTokenExpiration: string;
    refreshTokenExpiration: string;
  };
}
