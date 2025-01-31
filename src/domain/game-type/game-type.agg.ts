import AggregateBase from "src/common/domain/aggregate.base";
import { GameTypeStatus } from "./game-status.enum";

export type GameTypeProps = {
	name: string;
	guide: string;
	status: GameTypeStatus;
}

export class GameTypeAggregate extends AggregateBase<GameTypeProps> {
	update(name: string, guide: string, status: GameTypeStatus) {
		this.props.name = name;
		this.props.guide = guide;
		this.props.status = status;
	}
}