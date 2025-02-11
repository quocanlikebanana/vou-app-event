import { EventRepository } from "src/manage-event/infra/event.repository";

export class CreateEventCommand {
	constructor(
		private readonly eventRepository: EventRepository
	) { }
}