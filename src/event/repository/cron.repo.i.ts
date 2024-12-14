import { NotificationQueueDTO } from "../dto/notify.dto";

export default abstract class ICronRepository {
    abstract addStartInOneDay(notification: NotificationQueueDTO): Promise<void>;
    abstract popAllStartInOneDay(): Promise<NotificationQueueDTO[]>;

    abstract addStartNow(notification: NotificationQueueDTO): Promise<void>;
    abstract popAllStartNow(): Promise<NotificationQueueDTO[]>;
}