import ICommand from "src/common/app/command.i";
import { IUnitOfWork } from "src/common/domain/unit-of-work.i";
import { IEventRepository } from "src/domain/event/event.repo.i";
import { UpdateEventBody } from "./update-event.body";
import { DomainError } from "src/common/error/domain.error";

export class UpdateEventCommand implements ICommand<UpdateEventBody> {
	constructor(
		private readonly unitOfWork: IUnitOfWork
	) { }

	async execute(param: UpdateEventBody): Promise<void> {
		const eventRepository = this.unitOfWork.getRepository(IEventRepository);
		const event = await eventRepository.getById(param.id);
		if (!event) {
			throw new DomainError("Event not found");
		}
		event.update(param);
		await eventRepository.update(event);
		await this.unitOfWork.executeTransactions();
	}
}