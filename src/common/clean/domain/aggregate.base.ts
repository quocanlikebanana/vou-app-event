import { DomainEventBase } from "./domain-event.i";
import { EntityBase } from "./entity.base";

export default abstract class AggregateBase<T> extends EntityBase<T> {
	private readonly domainEvents: DomainEventBase[];

	constructor(props: T, id: string) {
		super(props, id);
		this.domainEvents = [];
	}

	protected addDomainEvent(event: DomainEventBase): void {
		this.domainEvents.push(event);
	}

	getEvents(): DomainEventBase[] {
		return this.domainEvents;
	}

	clearEvents(): void {
		this.domainEvents.splice(0, this.domainEvents.length);
	}
}