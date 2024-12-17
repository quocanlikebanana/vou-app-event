import { EventQueryParam } from "../dto/event.param";
import { EventInfoResult, EventSmallInfoResult, UsersJoinedEventResult, UsersLikedEventResult } from "../dto/event.result";

export default abstract class IEventQuery {
    abstract getAll(): Promise<EventInfoResult[]>;
    abstract getQuery(query: EventQueryParam): Promise<EventInfoResult[]>;
    abstract getInfo(id: string): Promise<EventInfoResult>;
    abstract getSmallInfo(id: string): Promise<EventSmallInfoResult>;
    abstract getUsersJoined(id: string): Promise<UsersJoinedEventResult>;
    abstract getUsersLiked(id: string): Promise<UsersLikedEventResult>;
}