import { ValueObject } from "src/common/value-object.i";

export type UserLikeProps = {
    userId: string;
    eventId: string;
};

export class UserLikeValueObject extends ValueObject<UserLikeProps> {
    protected validate(props: UserLikeProps): void { }
}