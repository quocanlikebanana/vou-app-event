import { IsString } from "class-validator";

export class EventStatsByIdParam {
	@IsString()
	id: string;
}