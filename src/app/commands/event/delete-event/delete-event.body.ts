import { IsString } from "class-validator";

export class DeleteEventBody {
	@IsString()
	eventId: string;
}