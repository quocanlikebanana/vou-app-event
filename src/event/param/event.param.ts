import { CreateEventDTO, UpdateEventDTO } from "../dto/event.dto";

export type CreateEventParam = Omit<CreateEventDTO, "usersJoin" | "usersLike">;
export type UpdateEventParam = UpdateEventDTO & { id: string; };
export type ValidateEventApprovalParam = { eventId: string; isApproved: boolean; };
export type LikeEventParam = { eventId: string; userId: string; };
export type UnlikeEventParam = LikeEventParam;
export type JoinEventParam = { eventId: string; userId: string; };
export type LeaveEventParam = JoinEventParam;