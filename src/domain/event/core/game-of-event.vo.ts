import { ValueObject } from "src/common/domain/value-object.i";

export type GameOfEventProps = {
	eventId: string;
	gameTypeId: string;
	name: string;
	description: string;
	image: string;
}

export class GameOfEventValueObject extends ValueObject<GameOfEventProps> {
}