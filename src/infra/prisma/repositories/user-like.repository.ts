import { IUserLikeRepository } from "src/domain/user-like/user-like.repo.i";
import { PrismaRepositoryBase } from "../prisma.repository.base";
import { Prisma } from "@prisma/client";

export class UserLikeRepository extends PrismaRepositoryBase implements IUserLikeRepository {
	async checkUserLikedEvent(userId: string, eventId: string): Promise<boolean> {
		const like = await this.uow.getPrismaService().user_Like_Event.findFirst({
			where: {
				userId,
				eventId
			}
		});
		if (!like) return false;
		return true;
	}

	async likeEvent(userId: string, eventId: string): Promise<void> {
		this.uow.addPendingTransaction(async (tx: Prisma.TransactionClient) => {
			await tx.user_Like_Event.create({
				data: {
					userId,
					eventId
				}
			});
		});
	}

	async unlikeEvent(userId: string, eventId: string): Promise<void> {
		this.uow.addPendingTransaction(async (tx: Prisma.TransactionClient) => {
			await tx.user_Like_Event.delete({
				where: {
					userId_eventId: {
						userId,
						eventId
					}
				}
			});
		});
	}

	async getAllUsersLikedEvent(eventId: string): Promise<{ userId: string; }[]> {
		return await this.uow.getPrismaService().user_Like_Event.findMany({
			where: {
				eventId
			},
			select: {
				userId: true
			}
		});
	}
}