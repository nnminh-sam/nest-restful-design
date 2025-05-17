import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, VersioningType } from '@nestjs/common';
import { IAppConfig } from 'src/configs/interfaces/application-config.interface';
import { DomainEnum } from 'src/configs';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { GlobalValidationPipe } from './common/pipes/global-validation.pipe';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appConfig: IAppConfig[DomainEnum.APP] = app
    .get(ConfigService)
    .get<IAppConfig[DomainEnum.APP]>(DomainEnum.APP);

  app.setGlobalPrefix(appConfig.apiPrefix);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.useGlobalPipes(new GlobalValidationPipe());

  app.useGlobalFilters(new HttpExceptionFilter());

  // * Init swagger document
  const swaggerConfig = new DocumentBuilder()
    .setTitle('NestJS Playground APIs')
    .setDescription('API endpoints for NestJS playground')
    .setVersion('1.0')
    .build();
  const documentFactory = (): OpenAPIObject =>
    SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-document', app, documentFactory, {
    swaggerOptions: { tagsSorter: 'alpha' },
  });

  await app.listen(appConfig.port, () => {
    const logger: Logger = new Logger(appConfig.name);
    logger.log(`Application started at: "${appConfig.host}:${appConfig.port}"`);
    logger.log(`Application API prefix: ${appConfig.apiPrefix}`);
    logger.log(`Application version type: URI`);
    logger.log(
      `Swagger document URL: "${appConfig.host}:${appConfig.port}/api-document"`,
    );
  });
}
bootstrap();
