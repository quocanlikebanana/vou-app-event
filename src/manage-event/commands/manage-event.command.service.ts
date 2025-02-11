import { DomainError } from "src/common/framework/error/domain.error";
import { EventModel } from "../dto/model/event.model";
import { CreateEventBody } from "./create-event/create-event.body";
import { UpdateEventBody } from "./request/update-event.body";
import { DeleteEventBody } from "./request/delete-event.body";
import { EventRepository } from "../infra/event.repository";
import { CreateEventResponse } from "./create-event/create-event.response";

export class ManageEventService {
	constructor(
		private readonly eventRepository: EventRepository
	) { }

	async create(createEventBody: CreateEventBody): Promise<CreateEventResponse> {
		const eventModel = EventModel.create(createEventBody);
		const { id } = await this.eventRepository.create(eventModel);
		return { id };
	}

	async update(updateEventBody: UpdateEventBody): Promise<void> {
		const eventModel = await this.eventRepository.get(updateEventBody.id);
		if (eventModel == null) {
			throw new DomainError("Event not found");
		}
		await this.eventRepository.update(eventModel);
	}

	async delete(deleteEventBody: DeleteEventBody): Promise<void> {
		const eventModel = await this.eventRepository.get(deleteEventBody.eventId);
		if (eventModel == null) {
			throw new DomainError("Event not found");
		}
		await this.eventRepository.delete(eventModel.getId());
	}
}