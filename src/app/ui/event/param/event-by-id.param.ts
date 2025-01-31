import { IsString } from "class-validator";

export class EventByIdParam {
	@IsString()
	id: string;
}