import { NestFactory } from '@nestjs/core';
import { PopulateService } from './event/standalone/populate.service';
import { EventModule } from './event/event.module';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(EventModule);
    const populateService = app.get<PopulateService>(PopulateService);
    await populateService.populate();
    await app.close();
}
bootstrap().catch(err => console.error(err));