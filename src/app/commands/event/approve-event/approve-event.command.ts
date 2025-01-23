import ICommand from "src/common/app/command.i";
import { ApproveEventBody } from "./approve-event.body";
import { IUnitOfWork } from "src/common/domain/unit-of-work.i";
import { IEventRepository } from "src/domain/event/event.repo.i";

export class ApproveEventCommand implements ICommand<ApproveEventBody> {
	constructor(
		private readonly unitOfWork: IUnitOfWork
	) { }

	async execute(param: ApproveEventBody): Promise<void> {
		const eventRepository = this.unitOfWork.getRepository(IEventRepository);
		const event = await eventRepository.getById(param.eventId);
		event.approve(param.isApproved);
		await eventRepository.update(event);
		await this.unitOfWork.executeTransactions();
	}
}