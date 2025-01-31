import { Prisma } from "@prisma/client";
import { EventAggregate } from "src/domain/event/core/event.agg";
import { IEventRepository } from "src/domain/event/event.repo.i";
import { PrismaRepositoryBase } from "../prisma.repository.base";
import { GameOfEventEntity } from "src/domain/event/core/game-of-event.entity";
import { EventStatus } from "src/domain/event/others/event-status.enum";

export class EventRepository extends PrismaRepositoryBase implements IEventRepository {
	async create(agg: EventAggregate): Promise<void> {
		this.uow.addPendingTransaction(async (tx: Prisma.TransactionClient) => {
			await tx.event.create({
				data: {
					id: agg.id,
					...agg.props,
					Game_Of_Event: {
						create: agg.props.gameOfEvents.map(goe => ({
							id: goe.id,
							...goe.props,
						}))
					}
				}
			});
		}, agg);
	}

	async update(agg: EventAggregate): Promise<void> {
		this.uow.addPendingTransaction(async (tx: Prisma.TransactionClient) => {
			await tx.event.update({
				where: {
					id: agg.id
				},
				data: {
					...agg.props,
					Game_Of_Event: {
						upsert: agg.props.gameOfEvents.map(goe => ({
							where: {
								id: goe.id
							},
							update: {
								...goe.props
							},
							create: {
								...goe.props
							}
						}))
					}
				}
			});
		}, agg);
	}

	async delete(agg: EventAggregate): Promise<void> {
		this.uow.addPendingTransaction(async (tx: Prisma.TransactionClient) => {
			await tx.event.delete({
				where: {
					id: agg.id
				}
			});
		}, agg);
	}

	async getById(id: string): Promise<EventAggregate> {
		const prisma = this.uow.getPrismaService();
		const result = await prisma.event.findUnique({
			where: {
				id
			},
			include: {
				Game_Of_Event: true
			}
		});
		if (!result) {
			throw new Error('Event not found');
		}
		return new EventAggregate({
			...result,
			eventStatus: result.eventStatus as any as EventStatus,
			gameOfEvents: result.Game_Of_Event.map(goe => new GameOfEventEntity({
				...goe,
			}, goe.id))
		}, result.id);
	}
}