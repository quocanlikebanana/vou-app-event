import ICommand from "src/common/app/command.i";
import { DeleteGameTypeBody } from "./delete-game-type.body";
import { IUnitOfWork } from "src/common/domain/unit-of-work.i";
import { IGameTypeRepository } from "src/domain/game-type/game-type.repo.i";

export class DeleteGameTypeCommand implements ICommand<DeleteGameTypeBody> {
	constructor(
		private readonly unitOfWork: IUnitOfWork,
	) { }

	async execute(param: DeleteGameTypeBody): Promise<void> {
		const gameTypeRepository = this.unitOfWork.getRepository(IGameTypeRepository);
		await gameTypeRepository.delete(param.id);
		await this.unitOfWork.commit();
	}
}