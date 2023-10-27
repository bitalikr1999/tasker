import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { CustomExceptionsFilter } from './shared/filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { excludeExtraneousValues: true },
    }),
  );

  app.enableCors({
    origin: '*',
  });

  app.useGlobalFilters(new CustomExceptionsFilter(new Logger()));

  await app.listen(3000);
}
bootstrap();
