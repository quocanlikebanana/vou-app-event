import { Module } from '@nestjs/common';
import { UnitOfWork } from './unitofwork';
import EventRepository from './repositories/event.repo';
import { PrismaService } from './prisma.service';
import CronRepository from './repositories/cron.repo';

@Module({
  providers: [
    PrismaService,
    UnitOfWork,
    EventRepository,
    CronRepository,
  ],
  exports: [
    UnitOfWork,
    PrismaService,
  ],
})
export class PersistenceModule { }
