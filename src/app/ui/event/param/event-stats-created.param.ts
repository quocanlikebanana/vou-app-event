import { IsString } from "class-validator";

export class EventStatsCreatedParam {
	@IsString()
	partnerId: string;
}