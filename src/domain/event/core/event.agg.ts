import AggregateRoot from "src/common/domain/aggregate.i";
import { DomainError } from "src/common/error/domain.error";
import { EventStatusContext } from "../others/event.state-dp";
import { generateUUID } from "src/common/utils/generator";
import { removeNullValues } from "src/common/utils/object";
import { CreateEventDTO, UpdateEventDTO } from "../others/event.dto";
import { EventStatus } from "../others/event-status.enum";
import { GameOfEventEntity } from "./game-of-event.entity";
import { dateFromNow } from "src/common/utils/date";
import { EventCreatedDomainEvent } from "../event/event-created.de";

export type EventProps = {
	name: string;
	description: string;
	image: string;
	eventStatus: EventStatus;
	startDate: Date;
	endDate: Date;
	partnerId: string;

	gameOfEvents: GameOfEventEntity[];
};

export class EventAggregate extends AggregateRoot<EventProps> {
	private readonly _eventStatusContext: EventStatusContext;

	protected validate(props: EventProps): void {
		if (props.startDate >= props.endDate) {
			throw new DomainError("Start date must be before end date");
		}
		if (props.gameOfEvents.length === 0) {
			throw new DomainError("Event must have at least one game");
		}
	}

	constructor(props: EventProps, id: string) {
		super(props, id);
		this._eventStatusContext = new EventStatusContext(this);
	}

	static create(createEvent: CreateEventDTO): EventAggregate {
		const id = generateUUID();
		const gameOfEvents = createEvent.gameOfEvents.map((game) => new GameOfEventEntity({
			...game,
			eventId: id,
		}, generateUUID()));
		const status = EventStatus.PENDING;
		const newEvent = new EventAggregate(
			{
				...createEvent,
				gameOfEvents,
				eventStatus: status,
			}, id);
		newEvent.addDomainEvent(new EventCreatedDomainEvent(newEvent));
		return newEvent;
	}

	update(event: Partial<UpdateEventDTO>): void {
		this._eventStatusContext.update();
		const notNullUpdateProps = removeNullValues(event);
		const { gameOfEvents, ...rest } = notNullUpdateProps;
		const newGameOfEvents = gameOfEvents?.map((game) => new GameOfEventEntity({
			...game,
			eventId: this.id,
		}, generateUUID()));
		const newProps = {
			...this.props,
			...rest,
			gameOfEvents: newGameOfEvents || this.props.gameOfEvents,
		};
		this.props = newProps;
	}

	approve(isApproved: boolean): void {
		if (isApproved) {
			this._eventStatusContext.approve();
		}
		else {
			this._eventStatusContext.reject();
		}
	}

	isStartingInSeconds(seconds: number): boolean {
		if (this.props.eventStatus === EventStatus.APPROVED) {
			const newDate = dateFromNow(seconds);
			const res = this.props.startDate <= newDate;
			return res;
		}
		return false;
	}

	isStartingNow(): boolean {
		if (this.props.eventStatus === EventStatus.APPROVED) {
			const now = dateFromNow();
			return this.props.startDate <= now;
		}
		return false;
	}
}