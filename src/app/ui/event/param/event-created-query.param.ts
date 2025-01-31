import { IsString } from "class-validator";
import { EventQueryParam } from "./event-query.param";

export class EventCreatedQueryParam extends EventQueryParam {
	@IsString()
	partnerId: string;
}