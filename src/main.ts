import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';
import { CatchEverythingFilter } from './utils/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new CatchEverythingFilter(httpAdapterHost));

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    exceptionFactory: (validationErrors: ValidationError[] = []) => {
      console.log('[VALIDATION ERROR]', validationErrors);

      const result = validationErrors.map((error) => ({
        property: error.property,
        message: error.constraints ? error.constraints[Object.keys(error.constraints)[0]] : 'Unknown error',
      }));
      return new BadRequestException(result);
    },
  }));

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
