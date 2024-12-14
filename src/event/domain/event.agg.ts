import { EventStatus } from "src/common/type";
import { EventStatusContext } from "./event.state-dp";
import AggregateRoot from "src/common/aggregate.i";
import { checkAllPropertiesNotNull, removeNullValues } from "src/utils/object";
import { DomainError } from "src/common/domain.error";
import { CreateEventDTO, UpdateEventDTO } from "../dto/event.dto";
import { UserJoinEntity } from "./user-join.entity";
import { UserLikeEntity } from "./user-like.entity";

export type EventProps = {
    name: string;
    description: string;
    image: string;
    _eventStatusContext: EventStatusContext;
    startDate: Date;
    endDate: Date;
    turnsPerDay: number;
    partnerId: string;
    usersJoin: UserJoinEntity[];
    usersLike: UserLikeEntity[];
};

export class EventAggregate extends AggregateRoot<EventProps> {
    private constructor(props: EventProps, id?: string) { super(props, id); }

    protected validate(props: EventProps): void {
        const now = new Date();
        checkAllPropertiesNotNull(props);
        if (props.startDate <= now) {
            throw new DomainError("Start date must be in the future");
        }
        if (props.startDate >= props.endDate) {
            throw new DomainError("Start date must be before end date");
        }
        if (props.turnsPerDay <= 0) {
            throw new DomainError("Turns per day must be greater than 0");
        }
    }

    static create(event: CreateEventDTO, id?: string): EventAggregate {
        const newEvent = new EventAggregate(
            {
                ...event,
                _eventStatusContext: event.eventStatus ? new EventStatusContext(event.eventStatus) : new EventStatusContext(EventStatus.PENDING)
            }, id);
        return newEvent;
    }

    update(event: Partial<UpdateEventDTO>): void {
        this.props._eventStatusContext.update();
        const notNullProps = removeNullValues(event);
        const newProps = { ...this.props, ...notNullProps };
        this.props = newProps;
    }

    validateApproval(isApproved: boolean): void {
        if (isApproved) {
            this.props._eventStatusContext.approve();
        }
        else {
            this.props._eventStatusContext.reject();
        }
    }

    isStartingInOneDay(): boolean {
        if (this.props._eventStatusContext.getState() === EventStatus.APPROVED) {
            const now = new Date();
            const oneDayFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
            const res = this.props.startDate <= oneDayFromNow;
            return res;
        }
        return false;
    }

    isStartingNow(): boolean {
        if (this.props._eventStatusContext.getState() === EventStatus.APPROVED) {
            const now = new Date();
            return this.props.startDate <= now;
        }
        return false;
    }
}