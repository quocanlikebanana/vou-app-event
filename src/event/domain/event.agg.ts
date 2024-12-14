import { EventStatus } from "src/common/type";
import { EventStatusContext } from "./event.state-dp";
import AggregateRoot from "src/common/aggregate.i";
import { checkAllPropertiesNotNull, removeNullValues } from "src/utils/object";
import { DomainError } from "src/common/domain.error";
import { CreateEventDTO } from "../dto/create-event.dto";
import { UpdateEventDTO } from "../dto/update-event.dto";
import { UserJoinEntity } from "./user-join.entity";
import { UserLikeValueObject } from "./user-like.vo";

export type EventProps = {
    name: string;
    description: string;
    image: string;
    _eventStatusContext: EventStatusContext;
    startDate: Date;
    endDate: Date;
    partnerId: string;
    usersJoin: UserJoinEntity[];
    usersLike: UserLikeValueObject[];
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
    }

    static create(event: CreateEventDTO, id?: string): EventAggregate {
        const newEvent = new EventAggregate(
            {
                ...event,
                _eventStatusContext: event.status ? new EventStatusContext(event.status) : new EventStatusContext(EventStatus.PENDING)
            }, id);
        return newEvent;
    }

    update(event: Partial<UpdateEventDTO>): void {
        this.props._eventStatusContext.update();
        const notNullProps = removeNullValues(event);
        const newProps = { ...this.props, ...notNullProps };
        this.props = newProps;
    }

    approve(): void {
        this.props._eventStatusContext.approve();
    }

    reject(): void {
        this.props._eventStatusContext.reject();
    }
}