import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  initSwagger(app);
  initStaticAssetProvider(app);
  const configService = app.get(ConfigService);

  const PORT = configService.get<number>('PORT');
  await app.listen(PORT);
}

function initSwagger(app: NestExpressApplication) {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Project Title')
    .addCookieAuth('jwt', null, 'jwt')
    .setDescription('desc')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/', app, document);
}

function initStaticAssetProvider(app: NestExpressApplication) {
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });
}

bootstrap();
