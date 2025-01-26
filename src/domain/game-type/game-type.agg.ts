import AggregateRoot from "src/common/domain/aggregate.i";
import { GameStatus } from "./game-status.enum";

export type GameTypeProps = {
	name: string;
	guide: string;
	status: GameStatus;
}

export class GameTypeAggregate extends AggregateRoot<GameTypeProps> {
	update(name: string, guide: string, status: GameStatus) {
		this.props.name = name;
		this.props.guide = guide;
		this.props.status = status;
	}
}