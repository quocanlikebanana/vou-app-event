import { EventProps } from "../core/event.agg";

type GameOfEventCreateDTO = {
	gameTypeId: string;
	name: string;
	description: string;
	image: string;
}

export type CreateEventDTO = Omit<EventProps, "gameOfEvents" | "eventStatus"> & {
	gameOfEvents: GameOfEventCreateDTO[];
};

export type UpdateEventDTO = Partial<Omit<EventProps, "gameOfEvents" | "eventStatus" | "startDate" | "endDate" | "partnerId">> & {
	gameOfEvents: GameOfEventCreateDTO[];
}