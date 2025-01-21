import { EventAggregate } from "../../domain/event/core/event.agg";
import { UserJoinEntity } from "../domain/user-join.entity";
import { UserLikeEntity } from "../../domain/user-like-event/user-like.agg";

export abstract class IEventRepository {
	abstract create(event: EventAggregate): Promise<{ id: string }>;
	abstract updateInfo(event: EventAggregate): Promise<void>;
	abstract delete(eventId: string): Promise<void>;

	abstract addUserJoin(userJoin: UserJoinEntity): Promise<void>;
	abstract updateUserJoinTurn(event: EventAggregate): Promise<void>;
	abstract deleteUserJoin(userId: string, eventId: string): Promise<void>;

	abstract addUserLike(userLike: UserLikeEntity): Promise<void>;
	abstract deleteUserLike(userId: string, eventId: string): Promise<void>;

	abstract getById(eventId: string): Promise<EventAggregate>;
	abstract getHappeningEvents(): Promise<EventAggregate[]>;
	abstract getUsersJoinedEvent(eventId: string): Promise<UserJoinEntity[]>;
}