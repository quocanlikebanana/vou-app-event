import { Module } from '@nestjs/common';
import { PersistenceModule } from './persistence/persistence.module';
import { UnitOfWork } from './persistence/unitofwork';
import { PrismaService } from './persistence/prisma.service';
import LoggerService from './logger/logger.service';
import { ConfigurationService } from 'src/utils/configuration';

@Module({
  imports: [PersistenceModule],
  providers: [
    UnitOfWork,
    PrismaService,
    LoggerService,
    ConfigurationService,
  ],
  exports: [
    UnitOfWork,
    PrismaService,
    LoggerService
  ],
})
export class InfraModule { }
