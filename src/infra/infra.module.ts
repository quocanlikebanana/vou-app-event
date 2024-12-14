import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { RepositoriesService } from './repositories/repositories.service';

@Module({

  providers: [PrismaService, RepositoriesService]
})
export class InfraModule { }
