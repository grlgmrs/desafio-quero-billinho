import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SetupSwagger } from '@shared/swagger';
import { AppModule } from './app.module';
import { QueryExceptionFilter } from './shared/exception-filter/query-exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new QueryExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  new SetupSwagger(app).init();

  await app.listen(3000);
}
bootstrap();
