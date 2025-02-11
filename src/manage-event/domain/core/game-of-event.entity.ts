import { EntityBase } from "src/common/domain/entity.base";

export type GameOfEventProps = {
	eventId: string;
	gameTypeId: string;
	name: string;
	description: string;
	image: string;
}

export class GameOfEventEntity extends EntityBase<GameOfEventProps> {
}