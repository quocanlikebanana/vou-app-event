import { IsString } from "class-validator";
import { EventQueryParam } from "./event-query.param";

export class EventPersonalizedQueryParam extends EventQueryParam {
	@IsString()
	userId: string;
}