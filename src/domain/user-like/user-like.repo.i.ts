export abstract class IUserLikeRepository {
	abstract checkUserLikedEvent(userId: string, eventId: string): Promise<boolean>;
	abstract likeEvent(userId: string, eventId: string): Promise<void>;
	abstract unlikeEvent(userId: string, eventId: string): Promise<void>;
	abstract getAllUsersLikedEvent(eventId: string): Promise<{ userId: string }[]>;
}