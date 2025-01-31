import { IsEnum, IsString } from "class-validator";
import { GameTypeStatus } from "src/domain/game-type/game-status.enum";

export class CreateGameTypeBody {
	@IsString()
	name: string;

	@IsString()
	guide: string;

	@IsEnum(GameTypeStatus)
	status: GameTypeStatus;
}