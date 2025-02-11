import { IRepository } from "./repository.i";

export abstract class IUnitOfWork {
	abstract getRepository<T extends IRepository>(entity: abstract new (...args: any[]) => T): T;
	abstract commit(): Promise<void>;
}