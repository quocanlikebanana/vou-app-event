import { EventResult } from "./event.result";

export class EventPersonalizedResult extends EventResult {
	userId: string;
	hasFollowed: boolean;
}