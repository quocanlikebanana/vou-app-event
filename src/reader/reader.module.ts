import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { InfraModule } from 'src/infra/infra.module';
import IEventQuery from './query/event.query.i';
import EventQuery from 'src/infra/persistence/queries/event.query';
import { UserEventController } from './user-event.controller';
import { PartnerEventController } from './partner-event.controller';

@Module({
  imports: [InfraModule],
  providers: [
    {
      provide: IEventQuery,
      useClass: EventQuery,
    },
    EventService,
  ],
  controllers: [
    EventController,
    UserEventController,
    PartnerEventController
  ],
})
export class ReaderModule { }
