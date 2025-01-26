import { IsString } from "class-validator";

export class DeleteGameTypeBody {
	@IsString()
	id: string;
}