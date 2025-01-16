import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './services/event.service';
import { CronEventService } from './services/cron.event.service';
import { NotificationService } from './services/notification.service';
import { InfraModule } from 'src/infra/infra.module';
import IUnitOfWork from 'src/common/unit-of-work.i';
import { UnitOfWork } from 'src/infra/persistence/unitofwork';
import { PopulateService } from './standalone/populate.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    InfraModule,
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 5,
    }),
  ],
  controllers: [EventController],
  providers: [
    {
      provide: IUnitOfWork,
      useExisting: UnitOfWork,
    },
    EventService,
    CronEventService,
    NotificationService,
    PopulateService,
  ],
})
export class EventModule { }
