import { IDomainEvent } from "./domain-event.i";
import { Entity } from "./entity.i";

export default abstract class AggregateRoot<T> extends Entity<T> {
    private readonly domainEvents: IDomainEvent[];

    protected constructor(props: T, id: string | null = null) {
        super(props, id);
        this.domainEvents = [];
    }

    protected addDomainEvent(event: IDomainEvent): void {
        this.domainEvents.push(event);
    }

    getEvents(): IDomainEvent[] {
        return this.domainEvents;
    }

    clearEvents(): void {
        this.domainEvents.splice(0, this.domainEvents.length);
    }
}