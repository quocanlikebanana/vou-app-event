export class DomainError<T = void> extends Error {
	public readonly _data?: T;

	constructor(message: string, data?: T) {
		super(message);
		this.name = 'DomainException';
		this._data = data;
	}
}