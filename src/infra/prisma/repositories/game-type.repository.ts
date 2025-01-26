import { GameTypeAggregate } from "src/domain/game-type/game-type.agg";
import { IGameTypeRepository } from "src/domain/game-type/game-type.repo.i";

export class GameTypeRepository implements IGameTypeRepository {
	create(gameType: GameTypeAggregate): Promise<{ id: string; }> {
		throw new Error("Method not implemented.");
	}
	update(gameType: GameTypeAggregate): Promise<void> {
		throw new Error("Method not implemented.");
	}
	delete(gameTypeId: string): Promise<void> {
		throw new Error("Method not implemented.");
	}
	getById(gameTypeId: string): Promise<GameTypeAggregate> {
		throw new Error("Method not implemented.");
	}
}