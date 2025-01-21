import { DomainError } from "src/common/error/domain.error";
import { EventAggregate } from "../core/event.agg";
import { EventStatus } from "./event-status.enum";

export class EventStatusContext {
	// Cause circular dependency
	private state: EventStatusState;
	private readonly context: EventAggregate;

	constructor(event: EventAggregate) {
		switch (event.props.eventStatus) {
			case EventStatus.PENDING:
				this.transitionTo(new PendingState());
				break;
			case EventStatus.APPROVED:
				this.transitionTo(new ApprovedState());
				break;
			case EventStatus.REJECTED:
				this.transitionTo(new RejectedState());
				break;
			default:
				throw new DomainError("Invalid event status");
		}
	}

	public transitionTo(state: EventStatusState): void {
		this.state = state;
		this.state.setContext(this);
		this.context.props.eventStatus = this.state.getState();
	}

	private getState(): EventStatus {
		return this.state.getState();
	}

	public approve(): void {
		this.state.approve();
	}

	public reject(): void {
		this.state.reject();
	}

	public update(): void {
		this.state.update();
	}
}

abstract class EventStatusState {
	// Cause circular dependency
	protected context: EventStatusContext;

	public setContext(context: EventStatusContext): void {
		this.context = context;
	}

	abstract getState(): EventStatus;

	abstract approve(): void;
	abstract reject(): void;
	abstract update(): void;
}

class PendingState extends EventStatusState {
	getState(): EventStatus {
		return EventStatus.PENDING;
	}

	public approve(): void {
		this.context.transitionTo(new ApprovedState());
	}

	public reject(): void {
		this.context.transitionTo(new RejectedState());
	}

	public update(): void {
	}
}

class ApprovedState extends EventStatusState {
	getState(): EventStatus {
		return EventStatus.APPROVED;
	}

	public approve(): void {
		throw new DomainError("Cannot approve event that is already approved");
	}

	public reject(): void {
		throw new DomainError("Cannot reject event that is already approved");
	}

	public update(): void {
		throw new DomainError("Cannot update event that is already approved");
	}
}

class RejectedState extends EventStatusState {
	getState(): EventStatus {
		return EventStatus.REJECTED;
	}

	public approve(): void {
		throw new DomainError("Cannot approve event that is already rejected");
	}

	public reject(): void {
		throw new DomainError("Cannot reject event that is already rejected");
	}

	public update(): void {
		throw new DomainError("Cannot update event that is already rejected");
	}
}