import { Module } from '@nestjs/common';
import { PersistenceModule } from './persistence/persistence.module';
import { UnitOfWork } from './persistence/unitofwork';
import { PrismaService } from './persistence/prisma.service';

@Module({
  imports: [PersistenceModule],
  providers: [UnitOfWork, PrismaService],
  exports: [UnitOfWork, PrismaService],
})
export class InfraModule { }
