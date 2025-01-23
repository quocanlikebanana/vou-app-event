import ICommand from "src/common/app/command.i";
import { CreateEventBody } from "./create-event.body";
import { IUnitOfWork } from "src/common/domain/unit-of-work.i";
import { IEventRepository } from "src/domain/event/event.repo.i";
import { EventAggregate } from "src/domain/event/core/event.agg";

export class CreateEventCommand implements ICommand<CreateEventBody> {
	constructor(
		private readonly unitOfWork: IUnitOfWork
	) { }

	async execute(param: CreateEventBody): Promise<void> {
		const eventRepository = this.unitOfWork.getRepository(IEventRepository);
		const event = EventAggregate.create({
			...param,
			gameOfEvents: param.gameOfEvents.map(gameOfEvent => ({
				...gameOfEvent,
			})),
		});
		await eventRepository.create(event);
		await this.unitOfWork.executeTransactions();
	}
}