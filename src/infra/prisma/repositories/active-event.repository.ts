import { ActiveEventProps, ActiveEventFullDTO } from "src/domain/active-event-service/active-event.dto";
import { IActiveEventRepository } from "src/domain/active-event-service/active-event.repo.i";

export class ActiveEventRepository implements IActiveEventRepository {
	create(agg: ActiveEventProps): Promise<void> {
		throw new Error("Method not implemented.");
	}
	update(agg: ActiveEventProps): Promise<void> {
		throw new Error("Method not implemented.");
	}
	updateNotifiedAll(): Promise<void> {
		throw new Error("Method not implemented.");
	}
	delete(eventId: string): Promise<void> {
		throw new Error("Method not implemented.");
	}
	getById(id: string): Promise<ActiveEventFullDTO> {
		throw new Error("Method not implemented.");
	}
	getAllNotNotified(): Promise<ActiveEventFullDTO[]> {
		throw new Error("Method not implemented.");
	}
}