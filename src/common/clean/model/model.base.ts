export abstract class ModelBase<T> {
	constructor(
		protected readonly _props: T
	) { }

	getData(): T {
		return { ...this._props };
	}

	abstract getId(): string;
}