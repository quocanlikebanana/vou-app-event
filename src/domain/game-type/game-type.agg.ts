import AggregateRoot from "src/common/domain/aggregate.i";
import { GameStatus } from "./game-status.enum";

export type GameTypeProps = {
	name: string;
	guide: string;
	status: GameStatus;
}

export class GameTypeAggregate extends AggregateRoot<GameTypeProps> {
}