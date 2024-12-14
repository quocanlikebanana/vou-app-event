import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './services/event.service';
import { CronEventService } from './services/cron.event.service';
import { NotificationService } from './services/notification.service';

@Module({
  imports: [
  ],
  controllers: [EventController],
  providers: [
    EventService,
    CronEventService,
    NotificationService,

  ]
})
export class EventModule { }
