import AggregateRoot from "src/common/domain/aggregate.i";

export type UserLikeProps = {
	userId: string;
	eventId: string;
};

export class UserLikeAggregate extends AggregateRoot<UserLikeProps> {
}