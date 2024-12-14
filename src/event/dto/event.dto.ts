import { EventStatus } from "src/common/type";
import { EventProps } from "../domain/event.agg";

export type CreateEventDTO = Omit<EventProps, "_eventStatusContext"> & { eventStatus?: EventStatus };
export type UpdateEventDTO = Omit<EventProps, "_eventStatusContext">;