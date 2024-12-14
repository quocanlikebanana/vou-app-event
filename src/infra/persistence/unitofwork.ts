import { Injectable, OnModuleDestroy } from '@nestjs/common';
import IUnitOfWork from 'src/common/unit-of-work.i';
import { PrismaService } from './prisma.service';
import { IEventRepository } from 'src/event/repository/event.repo.i';
import EventRepository from './repositories/event.repo';
import ICronRepository from 'src/event/repository/cron.repo.i';
import CronRepository from './repositories/cron.repo';

@Injectable()
export class UnitOfWork implements IUnitOfWork, OnModuleDestroy {
    private readonly prismaService: PrismaService;
    public readonly eventRepository: IEventRepository;
    public readonly cronRepository: ICronRepository;

    constructor() {
        this.eventRepository = new EventRepository(this.prismaService);
        this.cronRepository = new CronRepository(this.prismaService);
    }

    /**
     * Executes a function within a (iterative) transaction.
     */
    async executeTransaction<T>(fn: (tx: UnitOfWork) => Promise<T>): Promise<T> {
        return this.prismaService.$transaction(async (tx) => {
            const uow = new UnitOfWork();
            uow.prismaService.$connect();
            return fn(uow);
        });
    }

    async onModuleDestroy() {
        await this.prismaService.$disconnect();
    }
}