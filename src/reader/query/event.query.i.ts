import { EventQueryParam } from "../dto/event.param";
import { EventInfoResult, EventInfoUserResult, EventSmallInfoResult, UserInfoInEventResult, UsersJoinedEventResult, UsersLikedEventResult } from "../dto/event.result";

export default abstract class IEventQuery {
    abstract getAll(): Promise<EventInfoResult[]>;
    abstract getQuery(query: EventQueryParam): Promise<EventInfoResult[]>;
    abstract getQueryFromUser(query: EventQueryParam, userId: string): Promise<EventInfoUserResult[]>;
    abstract getInfo(id: string): Promise<EventInfoResult>;
    abstract getSmallInfo(id: string): Promise<EventSmallInfoResult>;
    abstract getUsersJoined(id: string): Promise<UsersJoinedEventResult>;
    abstract getUsersLiked(id: string): Promise<UsersLikedEventResult>;
    abstract getUserInfoInEvent(id: string, userId: string): Promise<UserInfoInEventResult>;
    abstract getEventOfPartner(partnerId: string): Promise<EventInfoResult[]>;
}