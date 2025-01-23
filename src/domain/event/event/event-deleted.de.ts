import { DomainEventBase } from "src/common/domain/domain-event.i";
import { EventAggregate } from "../core/event.agg";

export class EventDeletedDomainEvent extends DomainEventBase {
	constructor(
		public readonly event: EventAggregate,
	) {
		super();
	}
}