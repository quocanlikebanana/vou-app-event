import { IsNumber } from "class-validator";

export class EventStatsAllParam {
	@IsNumber()
	topMostCreatedPartner: number;

	@IsNumber()
	topMostFollowedEvent: number;
}