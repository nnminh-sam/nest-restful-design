import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, VersioningType } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { GlobalValidationPipe } from './common/pipes/global-validation.pipe';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { EnvironmentService } from 'src/configs/environment.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const env = app.get(EnvironmentService);

  app.enableCors();

  app.useStaticAssets(join(__dirname, '..', 'public'));

  const apiPrefix: string = env.use('API_PREFIX');
  app.setGlobalPrefix(apiPrefix);
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

  const port: number = env.use('PORT');
  const name: string = env.use('NAME');
  const host: string = env.use('HOST');

  await app.listen(port, () => {
    const logger: Logger = new Logger(name);
    logger.log(`Application started at: "${host}:${port}"`);
    logger.log(`Application API prefix: ${apiPrefix}`);
    logger.log(`Application version type: URI`);
    logger.log(`Swagger document URL: "${host}:${port}/api-document"`);
  });
}
bootstrap();
