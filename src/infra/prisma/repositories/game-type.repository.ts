import { GameTypeAggregate } from "src/domain/game-type/game-type.agg";
import { IGameTypeRepository } from "src/domain/game-type/game-type.repo.i";
import { PrismaRepositoryBase } from "../prisma.repository.base";
import { GameTypeStatus as PrismaGameTypeStatus, Prisma } from "@prisma/client";
import { GameTypeStatus } from "src/domain/game-type/game-status.enum";

export class GameTypeRepository extends PrismaRepositoryBase implements IGameTypeRepository {
	async create(gameType: GameTypeAggregate): Promise<void> {
		this.uow.addPendingTransaction(async (tx: Prisma.TransactionClient) => {
			await tx.gameType.create({
				data: {
					...gameType.props,
					status: gameType.props.status as PrismaGameTypeStatus
				}
			});
		}, gameType);
	}

	async update(gameType: GameTypeAggregate): Promise<void> {
		this.uow.addPendingTransaction(async (tx: Prisma.TransactionClient) => {
			await tx.gameType.update({
				where: {
					id: gameType.id
				},
				data: {
					...gameType.props,
					status: gameType.props.status as PrismaGameTypeStatus
				}
			});
		}, gameType);
	}

	async delete(gameTypeId: string): Promise<void> {
		this.uow.addPendingTransaction(async (tx: Prisma.TransactionClient) => {
			await tx.gameType.delete({
				where: {
					id: gameTypeId
				}
			});
		});
	}

	async getById(gameTypeId: string): Promise<GameTypeAggregate | null> {
		const gameType = await this.uow.getPrismaService().gameType.findUnique({
			where: {
				id: gameTypeId
			}
		});
		if (!gameType) return null;
		return new GameTypeAggregate({
			name: gameType.name,
			guide: gameType.guide,
			status: gameType.status as GameTypeStatus
		}, gameType.id);
	}
}