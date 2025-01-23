import ICommand from "src/common/app/command.i";
import { DeleteEventBody } from "./delete-event.body";
import { IUnitOfWork } from "src/common/domain/unit-of-work.i";
import { IEventRepository } from "src/domain/event/event.repo.i";

export class DeleteEventCommand implements ICommand<DeleteEventBody> {
	constructor(
		private readonly unitOfWork: IUnitOfWork
	) { }

	async execute(param: DeleteEventBody): Promise<void> {
		const eventRepository = this.unitOfWork.getRepository(IEventRepository);
		const event = await eventRepository.getById(param.eventId);
		await eventRepository.delete(event);
		await this.unitOfWork.executeTransactions();
	}
}