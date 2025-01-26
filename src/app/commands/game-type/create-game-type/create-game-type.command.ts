import ICommand from "src/common/app/command.i";
import { CreateGameTypeBody } from "./create-game-type.body";
import { IUnitOfWork } from "src/common/domain/unit-of-work.i";
import { IGameTypeRepository } from "src/domain/game-type/game-type.repo.i";
import { GameTypeAggregate } from "src/domain/game-type/game-type.agg";
import { generateUUID } from "src/common/utils/generator";

export class CreateGameTypeCommand implements ICommand<CreateGameTypeBody> {
	constructor(
		private readonly unitOfWork: IUnitOfWork,
	) { }

	async execute(param: CreateGameTypeBody): Promise<void> {
		const gameTypeRepository = this.unitOfWork.getRepository(IGameTypeRepository);
		const id = generateUUID();
		const gameType = new GameTypeAggregate({
			...param,
		}, id);
		await gameTypeRepository.create(gameType);
		await this.unitOfWork.commit();
	}
}