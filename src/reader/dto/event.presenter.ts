import { EventInfoResult, EventSmallInfoResult, UsersLikedEventResult as UsersLikedEventResult, UsersJoinedEventResult } from "./event.result";

export type EventSmallInfoPresenter = Omit<EventSmallInfoResult, "eventStatus"> & {
    eventStatus: string
};

export type EventInfoPresenter = Omit<EventInfoResult, "eventStatus"> & {
    eventStatus: string
};

export type UsersJoinedEventPresenter = UsersJoinedEventResult;

export type UsersLikedEventPresenter = UsersLikedEventResult;