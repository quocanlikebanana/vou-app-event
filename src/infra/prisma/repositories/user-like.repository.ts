import { IUserLikeRepository } from "src/domain/user-like/user-like.repo.i";

export class UserLikeRepository implements IUserLikeRepository {
	checkUserLikedEvent(userId: string, eventId: string): Promise<boolean> {
		throw new Error("Method not implemented.");
	}
	likeEvent(userId: string, eventId: string): Promise<void> {
		throw new Error("Method not implemented.");
	}
	unlikeEvent(userId: string, eventId: string): Promise<void> {
		throw new Error("Method not implemented.");
	}
	getAllUsersLikedEvent(eventId: string): Promise<{ userId: string; }[]> {
		throw new Error("Method not implemented.");
	}
}