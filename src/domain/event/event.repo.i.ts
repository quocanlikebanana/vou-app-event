import { EventAggregate } from "./core/event.agg";

export abstract class IEventRepository {
	abstract create(event: EventAggregate): Promise<{ id: string }>;
	abstract update(event: EventAggregate): Promise<void>;
	abstract delete(eventId: string): Promise<void>;
	abstract getById(eventId: string): Promise<EventAggregate>;
}