import { IsString } from "class-validator";
import { EventByIdParam } from "./event-by-id.param";

export class EventPersonalizedByIdParam extends EventByIdParam {
	@IsString()
	userId: string;
}