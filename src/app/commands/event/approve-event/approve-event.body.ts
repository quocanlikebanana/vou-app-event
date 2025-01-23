import { IsBoolean, IsString } from "class-validator";

export class ApproveEventBody {
	@IsString()
	eventId: string;

	@IsBoolean()
	isApproved: boolean;
}