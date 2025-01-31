import { ActiveEventProps, ActiveEventFullDTO, ActiveEventStatus } from "src/domain/active-event-service/active-event.dto";
import { IActiveEventRepository } from "src/domain/active-event-service/active-event.repo.i";
import { PrismaRepositoryBase } from "../prisma.repository.base";
import { Prisma } from "@prisma/client";

export class ActiveEventRepository extends PrismaRepositoryBase implements IActiveEventRepository {
	async create(agg: ActiveEventProps): Promise<void> {
		this.uow.addPendingTransaction(async (tx: Prisma.TransactionClient) => {
			await tx.active_Event.create({
				data: {
					...agg
				}
			})
		});
	}

	async update(agg: ActiveEventProps): Promise<void> {
		this.uow.addPendingTransaction(async (tx: Prisma.TransactionClient) => {
			await tx.active_Event.update({
				where: {
					eventId: agg.eventId
				},
				data: {
					...agg
				}
			});
		});
	}

	async updateHasNotifiedAll(): Promise<void> {
		this.uow.addPendingTransaction(async (tx: Prisma.TransactionClient) => {
			await tx.active_Event.updateMany({
				where: {
					hasNotified: false
				},
				data: {
					hasNotified: true
				}
			});
		});
	}

	async delete(eventId: string): Promise<void> {
		this.uow.addPendingTransaction(async (tx: Prisma.TransactionClient) => {
			await tx.active_Event.delete({
				where: {
					eventId: eventId
				}
			});
		});
	}

	async getById(id: string): Promise<ActiveEventFullDTO | null> {
		const event = await this.uow.getPrismaService().active_Event.findUnique({
			where: {
				eventId: id
			},
			include: {
				Event: {
					select: {
						name: true,
						startDate: true,
						endDate: true
					}
				}
			}
		});
		if (!event) {
			return null;
		}
		return {
			...event,
			status: event.status as any as ActiveEventStatus,
			eventName: event.Event.name,
			startDate: event.Event.startDate,
			endDate: event.Event.endDate
		};
	}

	async getAllNotNotified(): Promise<ActiveEventFullDTO[]> {
		const activeEvents = await this.uow.getPrismaService().active_Event.findMany({
			where: {
				hasNotified: false
			},
			include: {
				Event: {
					select: {
						name: true,
						startDate: true,
						endDate: true
					}
				}
			}
		});
		return activeEvents.map(event => {
			return {
				...event,
				status: event.status as any as ActiveEventStatus,
				eventName: event.Event.name,
				startDate: event.Event.startDate,
				endDate: event.Event.endDate
			};
		});
	}
}