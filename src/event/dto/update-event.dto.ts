import { EventProps } from "../domain/event.agg";

export type UpdateEventDTO = Omit<EventProps, "_eventStatusContext">;
