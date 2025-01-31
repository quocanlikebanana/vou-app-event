import { IUnitOfWork } from "src/common/domain/unit-of-work.i";
import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { DomainEventDispatcher } from "src/common/domain/domain-event-dispatcher";
import { DomainError } from "src/common/error/domain.error";
import { Prisma } from "@prisma/client";
import { DomainEventBase } from "src/common/domain/domain-event.i";
import { PrismaService } from "./prisma.service";
import { IRepository } from "src/common/domain/repository.i";
import AggregateBase from "src/common/domain/aggregate.base";

export type AggregateTransaction = {
	transaction: (tx: Prisma.TransactionClient) => Promise<void>;
	domainEvents: DomainEventBase[];
}

@Injectable()
export class PrismaUnitOfWork implements IUnitOfWork, OnModuleDestroy {
	private readonly pendingTransactions: AggregateTransaction[] = [];
	private readonly repositories: Map<string, IRepository> = new Map();

	constructor(
		private readonly prismaService: PrismaService,
		private readonly domainEventDispatcher: DomainEventDispatcher
	) {
		// this.repositories.set(IQuizGameRepository.name, new QuizGameRepository(this.prismaService, domainEventDispatcher));
		// this.repositories.set(IUserQuizRepository.name, new UserQuizRepository(this.prismaService, domainEventDispatcher));
	}

	addPendingTransaction(transaction: (tx: Prisma.TransactionClient) => Promise<void>, agg?: AggregateBase<any>): void {
		this.pendingTransactions.push({
			transaction: transaction,
			domainEvents: agg?.getEvents() ?? []
		});
	}

	getPrismaService(): PrismaService {
		return this.prismaService;
	}

	getRepository<T extends IRepository>(entity: abstract new (...args: any[]) => T): T {
		const repository = this.repositories.get(entity.name);
		if (!repository) {
			throw new DomainError(`Repository for ${entity.name} not found`);
		}
		return repository as T;
	}

	/**
	 * Executes a function within a (iterative) transaction. This implementation provide a more flexible way to handle transactions instead of only use the "saveChanges".
	 */
	async commit(): Promise<void> {
		const domainEvents: DomainEventBase[] = [];
		try {
			await this.prismaService.$transaction(async (tx) => {
				while (this.pendingTransactions.length > 0) {
					const aggregateTransaction = this.pendingTransactions.pop();
					if (aggregateTransaction == null) {
						continue;
					}
					await aggregateTransaction.transaction(tx);
					domainEvents.push(...aggregateTransaction.domainEvents);
				}
			});
		} catch (error) {
			throw new DomainError(`Error executing transaction: ${error}`);
		}
		for (const event of domainEvents) {
			this.domainEventDispatcher.dispatch(event);
		}
	}

	async onModuleDestroy() {
		await this.prismaService.$disconnect();
	}
}
