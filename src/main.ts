import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CrudConfigService } from '@nestjsx/crud';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { AppModule } from './app.module';

dotenv.config({
  path: path.resolve(process.cwd(), `.env.stage.${process.env.STAGE}`),
});

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.enableShutdownHooks();
  CrudConfigService.load({
    query: {
      softDelete: true,
      maxLimit: 100,
      cache: false,
      alwaysPaginate: true,
    },
    params: {
      id: {
        field: 'id',
        type: 'uuid',
        primary: true,
      },
    },
    routes: {
      updateOneBase: {
        allowParamsOverride: true,
      },
      deleteOneBase: {
        returnDeleted: true,
      },
    },
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors();

  const config = new DocumentBuilder()
    .setTitle('Nest TypeOrm Crud')
    .setDescription('Api endpoints')
    .setVersion('1.0')
    .addTag('Nest Crud')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document);

  await app.listen(PORT, () => {
    console.log('app listening on port: ', PORT);
  });
}
bootstrap();
