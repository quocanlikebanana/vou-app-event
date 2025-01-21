import { UserLikeAggregate } from "./user-like.agg";

export abstract class IUserLikeRepository {
	abstract create(userLike: UserLikeAggregate): Promise<{ id: string }>;
	abstract update(userLike: UserLikeAggregate): Promise<void>;
	abstract delete(userLikeId: string): Promise<void>;
	abstract getById(userLikeId: string): Promise<UserLikeAggregate>;
}