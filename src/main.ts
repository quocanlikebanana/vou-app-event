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
      const extractErrors = (errors: ValidationError[], parentPath = ''): any[] => {
        return errors.flatMap(error => {
          const propertyPath = parentPath ? `${parentPath}.${error.property}` : error.property;
          const currentError = error.constraints ? {
            property: propertyPath,
            message: Object.values(error.constraints).join(', '),
          } : null;

          const nestedErrors = error.children ? extractErrors(error.children, propertyPath) : [];
          return currentError ? [currentError, ...nestedErrors] : nestedErrors;
        });
      };

      const result = extractErrors(validationErrors);
      return new BadRequestException(result);
    },
  }));

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
