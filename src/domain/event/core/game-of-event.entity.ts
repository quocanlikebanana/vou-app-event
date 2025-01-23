import { Entity } from "src/common/domain/entity.i";

export type GameOfEventProps = {
	eventId: string;
	gameTypeId: string;
	name: string;
	description: string;
	image: string;
}

export class GameOfEventEntity extends Entity<GameOfEventProps> {
}