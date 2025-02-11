import { ModelBase } from "src/common/clean/model/model.base";
import { GameOfEventData } from "../data/game-of-event.data";

export class GameOfEventModel extends ModelBase<GameOfEventData> {
	getId(): string {
		return this._props.id;
	}

	constructor(
		protected readonly _props: GameOfEventData
	) {
		super(_props);
	}
}