import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { environmentConfig } from './configs/environment.config';
import { swaggerConfig } from './configs/swagger.config';

function setupSwagger(app: INestApplication) {
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  await app.listen(environmentConfig.port);
}

// eslint-disable-next-line unicorn/prefer-top-level-await
bootstrap();
