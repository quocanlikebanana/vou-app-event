import { IsString } from "class-validator";

export class ToggleLikeEventBody {
	@IsString()
	eventId: string;

	@IsString()
	userId: string;
}