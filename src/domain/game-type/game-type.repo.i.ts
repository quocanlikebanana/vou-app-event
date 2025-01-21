import { GameTypeAggregate } from "./game-type.agg";

export abstract class IGameTypeRepository {
	abstract create(gameType: GameTypeAggregate): Promise<{ id: string }>;
	abstract update(gameType: GameTypeAggregate): Promise<void>;
	abstract delete(gameTypeId: string): Promise<void>;
	abstract getById(gameTypeId: string): Promise<GameTypeAggregate>;
}