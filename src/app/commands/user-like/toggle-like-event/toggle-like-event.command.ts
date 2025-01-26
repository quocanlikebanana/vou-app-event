import ICommand from "src/common/app/command.i";
import { ToggleLikeEventBody } from "./toggle-like-event.body";
import { IUnitOfWork } from "src/common/domain/unit-of-work.i";
import { IUserLikeRepository } from "src/domain/user-like/user-like.repo.i";
import { IEventRepository } from "src/domain/event/event.repo.i";
import { DomainError } from "src/common/error/domain.error";

export class ToggleLikeEventCommand implements ICommand<ToggleLikeEventBody> {
	constructor(
		private readonly unitOfWork: IUnitOfWork
	) { }

	async execute(param: ToggleLikeEventBody): Promise<void> {
		const userLikeRepo = this.unitOfWork.getRepository(IUserLikeRepository);
		const eventRepo = this.unitOfWork.getRepository(IEventRepository);
		const event = await eventRepo.getById(param.eventId);
		if (!event) {
			throw new DomainError("Event not found");
		}
		const hasUserLiked = await userLikeRepo.checkUserLikedEvent(param.userId, param.eventId);
		if (hasUserLiked) {
			await userLikeRepo.unlikeEvent(param.userId, param.eventId);
		}
		else {
			await userLikeRepo.likeEvent(param.userId, param.eventId);
		}
		await this.unitOfWork.commit();
	}
}