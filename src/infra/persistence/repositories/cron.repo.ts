import { NotificationQueueDTO } from "src/event/dto/notify.dto";
import ICronRepository from "src/event/repository/cron.repo.i";
import { PrismaService } from "../prisma.service";

export default class CronRepository implements ICronRepository {
    constructor(
        private readonly prismaService: PrismaService
    ) { }

    addStartInOneDay(notification: NotificationQueueDTO): Promise<void> {
        throw new Error("Method not implemented.");
    }

    popAllStartInOneDay(): Promise<NotificationQueueDTO[]> {
        throw new Error("Method not implemented.");
    }

    addStartNow(notification: NotificationQueueDTO): Promise<void> {
        throw new Error("Method not implemented.");
    }

    popAllStartNow(): Promise<NotificationQueueDTO[]> {
        throw new Error("Method not implemented.");
    }
}