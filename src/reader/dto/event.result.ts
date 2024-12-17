import { EventStatus } from "src/common/type";

export type EventSmallInfoResult = {
    id: string;
    name: string;
    image: string;
    eventStatus: EventStatus;
    startDate: Date;
    endDate: Date;
};

export type EventInfoResult = EventSmallInfoResult & {
    description: string;
    turnsPerDay: number;
    partnerId: string;
};

export type UsersJoinedEventResult = {
    userJoin: {
        userId: string;
        turn: number;
    }[];
}

export type UsersLikedEventResult = {
    userLiked: {
        userId: string;
    }[];
}