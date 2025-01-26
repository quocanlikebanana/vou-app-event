import ICommand from "src/common/app/command.i";
import { UpdateGameTypeBody } from "./update-game-type.body";
import { IUnitOfWork } from "src/common/domain/unit-of-work.i";
import { IGameTypeRepository } from "src/domain/game-type/game-type.repo.i";

export class UpdateGameTypeCommand implements ICommand<UpdateGameTypeBody> {
	constructor(
		private readonly unitOfWork: IUnitOfWork
	) { }

	async execute(param: UpdateGameTypeBody): Promise<void> {
		const gameTypeRepository = this.unitOfWork.getRepository(IGameTypeRepository);
		const gameType = await gameTypeRepository.getById(param.id);
		gameType.update(param.name, param.guide, param.status);
		await gameTypeRepository.update(gameType);
		await this.unitOfWork.commit();
	}
}