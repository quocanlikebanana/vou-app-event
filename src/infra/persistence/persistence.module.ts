import { Module } from '@nestjs/common';
import { UnitOfWork } from './unitofwork';
import EventRepository from './repositories/event.repo';
import { PrismaService } from './prisma.service';

@Module({
  providers: [
    PrismaService,
    UnitOfWork,
    EventRepository,
  ]
})
export class PersistenceModule { }
