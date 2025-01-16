import { DomainError } from "src/common/domain.error";
import { Entity } from "src/common/entity.i";
import { checkAllPropertiesNotNull } from "src/utils/object";

export type UserJoinProps = {
    userId: string;
    eventId: string;
    turn: number;
};

export class UserJoinEntity extends Entity<UserJoinProps> {
    protected validate(props: UserJoinProps): void {
        checkAllPropertiesNotNull(props);
        if (props.turn < 0) {
            throw new DomainError("Turn must be greater than or equal to 0");
        }
    }

    public refillTurn(turn: number): void {
        if (this.props.turn < turn) {
            this.props.turn = turn;
        }
    }

    public addTurn(turn: number): void {
        if (this.props.turn + turn < 0) {
            throw new DomainError("Not enough turn");
        }
        this.props.turn = this.props.turn + turn;
    }
}