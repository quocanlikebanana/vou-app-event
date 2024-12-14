import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import IUnitOfWork from 'src/common/unit-of-work.i';
import { NotificationService } from './notification.service';
import { UserJoinEntity } from '../domain/user-join.entity';
import { NotificationQueueDTO } from '../dto/notify.dto';

@Injectable()
export class CronEventService {
    private readonly ONE_DAY_MESSAGE = 'Event will start in one day';
    private readonly NOW_MESSAGE = 'Event is starting now';

    constructor(
        private readonly unitOfWork: IUnitOfWork,
        private readonly notificationService: NotificationService
    ) { }

    private async sendNotificationsFromQueue(notificationQueue: NotificationQueueDTO[], message: string) {
        const users: UserJoinEntity[] = [];
        for (const noti of notificationQueue) {
            users.push(...await this.unitOfWork.eventRepository.getUsersJoinedEvent(noti.eventId));
        }
        await this.notificationService.sendNotificationToUsers(
            users.map(user => user.props.userId),
            this.ONE_DAY_MESSAGE
        );
    }

    private async notifyUsersOneDayBeforeEvent() {
        const notificationQueue = await this.unitOfWork.cronRepository.popAllStartInOneDay();
        await this.sendNotificationsFromQueue(notificationQueue, this.ONE_DAY_MESSAGE);
    }

    private async notifyUsersEventStarted() {
        const notificationQueue = await this.unitOfWork.cronRepository.popAllStartNow();
        await this.sendNotificationsFromQueue(notificationQueue, this.NOW_MESSAGE);
    }

    @Cron(CronExpression.EVERY_HOUR)
    async handleEventStartNotification() {
        await this.notifyUsersOneDayBeforeEvent();
        await this.notifyUsersEventStarted();
    }

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async handleCronEveryDay() {
        const events = await this.unitOfWork.eventRepository.getHappeningEvents();
        for (const event of events) {
            for (const user of event.props.usersJoin) {
                user.refillTurn(event.props.turnsPerDay);
            }
        }
        await this.unitOfWork.executeTransaction(async (uow) => {
            return await Promise.all(events.map(event => uow.eventRepository.updateUserJoinTurn(event)));
        });
    }
}
