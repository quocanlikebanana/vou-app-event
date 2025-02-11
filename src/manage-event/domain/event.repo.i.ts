import { IRepository } from "src/common/domain/repository.i";
import { EventAggregate } from "./core/event.agg";

export abstract class IEventRepository implements IRepository {
	abstract create(agg: EventAggregate): Promise<void>;
	abstract update(agg: EventAggregate): Promise<void>;
	abstract delete(agg: EventAggregate): Promise<void>;
	abstract getById(id: string): Promise<EventAggregate>;
}