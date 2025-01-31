import { EventResult } from "./results/event.result";
import { PagingResultSup } from "./common/paging.result.sup";
import { EventAllParam } from "./param/event-all.param";
import { EventByIdParam } from "./param/event-by-id.param";
import { EventQueryParam } from "./param/event-query.param";

export abstract class IEventReader {
	abstract getAll(param: EventAllParam): Promise<PagingResultSup<EventResult>>;
	abstract getById(param: EventByIdParam): Promise<EventResult>;
	abstract query(param: EventQueryParam): Promise<PagingResultSup<EventResult>>;
}