import { ModelBase } from "src/common/clean/model/model.base";
import { EventData } from "../data/event.data";
import { GameOfEventData } from "../data/game-of-event.data";
import { CreateEventBody } from "../../commands/create-event/create-event.body";
import { GameOfEventModel } from "./game-of-event.model";
import { generateUUID } from "src/common/utils/generator";

export class EventModel extends ModelBase<EventData> {
	constructor(
		protected readonly _props: EventData,
		private readonly _games: GameOfEventModel[]
	) {
		super(_props);
	}

	getId(): string {
		return this._props.id;
	}

	static create(createEventBody: CreateEventBody): EventModel {
		const eventId = generateUUID();
		const games = createEventBody.gameOfEvents.map(game => {
			const gameId = generateUUID();
			const gameProps: GameOfEventData = {
				...game,
				id: gameId,
				eventId
			}
			return new GameOfEventModel(gameProps);
		});
		const eventProps: EventData = {
			...createEventBody,
			id: eventId,
			eventStatus: "PENDING",
		}
		return new EventModel(eventProps, games);
	}

	getGames(): readonly GameOfEventModel[] {
		return [...this._games];
	}
}