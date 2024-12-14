import { generateUUID } from "src/utils/id";

export abstract class Entity<T> {
    private readonly _id: string;
    private _props: T;

    protected constructor(props: T, id: string = null) {
        // Id must be assigned first
        this._id = id ?? generateUUID();
        this.validate(props);
        this._props = props;
    }

    // Business logic validation: The relations between the properties of the entity not the single properties themselves (format, length, notnull, etc)
    // Is not the same as DTO validation
    // Implement validation rules in the concrete entity class
    protected abstract validate(newProps: T): void;

    public equals(entity: Entity<T>): boolean {
        return entity._id === this._id;
    }

    public get id(): string {
        return this._id;
    }

    public get props(): T {
        return this._props;
    }

    protected set props(newProps: T) {
        this.validate(newProps);
        this._props = newProps;
    }
}