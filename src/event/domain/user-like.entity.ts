import { Entity } from "src/common/entity.i";

export type UserLikeProps = {
    userId: string;
    eventId: string;
};

export class UserLikeEntity extends Entity<UserLikeProps> {
    protected validate(props: UserLikeProps): void { }
}