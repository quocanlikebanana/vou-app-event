import { NotificationQueueDTO } from "src/event/dto/notify.dto";
import ICronRepository from "src/event/repository/cron.repo.i";
import { PrismaService } from "../prisma.service";

export default class CronRepository implements ICronRepository {
    constructor(
        private readonly prismaService: PrismaService
    ) { }

    async addStartInOneDay(notification: NotificationQueueDTO): Promise<void> {
        await this.prismaService.startInOneDay_Event.create({
            data: {
                eventId: notification.eventId,
                notificationDate: notification.notificationDate,
            }
        });
    }

    async popAllStartInOneDay(): Promise<NotificationQueueDTO[]> {
        const res = await this.prismaService.$transaction(async (tx) => {
            const res = await tx.startInOneDay_Event.findMany();
            await tx.startInOneDay_Event.deleteMany();
            return res.map(e => {
                return {
                    eventId: e.eventId,
                    notificationDate: e.notificationDate
                };
            });
        });
        return res;
    }

    async addStartNow(notification: NotificationQueueDTO): Promise<void> {
        await this.prismaService.startNow_Event.create({
            data: {
                eventId: notification.eventId,
                notificationDate: notification.notificationDate,
            }
        });
    }

    async popAllStartNow(): Promise<NotificationQueueDTO[]> {
        const res = await this.prismaService.$transaction(async (tx) => {
            const res = await tx.startNow_Event.findMany();
            await tx.startNow_Event.deleteMany();
            return res.map(e => {
                return {
                    eventId: e.eventId,
                    notificationDate: e.notificationDate
                };
            });
        });
        return res;
    }
}