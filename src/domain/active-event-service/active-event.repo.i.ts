import { IRepository } from "src/common/domain/repository.i";
import { ActiveEventFullDTO, ActiveEventProps } from "./active-event.dto";

export abstract class IActiveEventRepository implements IRepository {
	abstract create(agg: ActiveEventProps): Promise<void>;
	abstract update(agg: ActiveEventProps): Promise<void>;
	abstract updateHasNotifiedAll(): Promise<void>;
	abstract delete(eventId: string): Promise<void>;
	abstract getById(id: string): Promise<ActiveEventFullDTO | null>;
	abstract getAllNotNotified(): Promise<ActiveEventFullDTO[]>;
}