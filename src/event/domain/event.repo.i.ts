import { CreateEventDTO } from "../dto/create-event.dto";
import { UpdateEventDTO } from "../dto/update-event.dto";
import { EventAggregate } from "./event.agg";

export abstract class IEventRepository {
    abstract create(event: CreateEventDTO): Promise<EventAggregate>;
    abstract update(event: UpdateEventDTO): Promise<void>;
    abstract delete(eventId: string): Promise<void>;
    abstract approve(eventId: string): Promise<void>;
    abstract reject(eventId: string): Promise<void>;
    abstract getEventById(eventId: string): Promise<EventAggregate>;
}