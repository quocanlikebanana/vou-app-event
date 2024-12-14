import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { ConfigurationService } from './utils/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configurationService = app.get(ConfigurationService);

  const url = `amqp://${configurationService.rbmqHost}:${configurationService.rbmqPort}`;

  const microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [url],
      queue: configurationService.eventQueue,
      queueOptions: {
        durable: false
      },
    }
  });
  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`RabbitMQ is running on: ${url}`);
}
bootstrap();
