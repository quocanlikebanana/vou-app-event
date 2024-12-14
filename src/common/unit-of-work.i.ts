import ICronRepository from "src/event/repository/cron.repo.i";
import { IEventRepository } from "src/event/repository/event.repo.i";

export default abstract class IUnitOfWork {
    abstract get eventRepository(): IEventRepository;
    abstract get cronRepository(): ICronRepository;

    /**
     * Executes a function within a (iterative) transaction.
     * NOTE: Do note open the "gate" for too long, for example: send emails, notifications, .... (That's why it is called in each execute method, not at an common abstract method)
     */
    abstract executeTransaction<T>(fn: (uow: IUnitOfWork) => Promise<T>): Promise<T>;
}