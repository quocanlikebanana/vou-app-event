import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { IActiveEventRepository } from 'src/domain/active-event-service/active-event.repo.i';
import { PrismaUnitOfWork } from '../prisma/unit-of-work';
import { NotificationService } from './notification.service';
import { IEventRepository } from 'src/domain/event/event.repo.i';
import { ActiveEventService } from 'src/domain/active-event-service/active-event.service';
import { IUserLikeRepository } from 'src/domain/user-like-event/user-like.repo.i';


@Injectable()
export class ScheduleService {
	constructor(
		private readonly unitOfWork: PrismaUnitOfWork,
		private readonly notificationService: NotificationService,
	) { }

	@Cron(CronExpression.EVERY_MINUTE)
	async notifiEvents() {
		const activeEventRepo = this.unitOfWork.getRepository(IActiveEventRepository);
		const userLikeRepo = this.unitOfWork.getRepository(IUserLikeRepository);
		const activeEvents = await activeEventRepo.getAllNotNotified();
		for (const ae of activeEvents) {
			const message = ActiveEventService.getNotificationMessageFromActiveEvent(ae);
			const users = await userLikeRepo.getAllUsersLikedEvent(ae.eventId);
			const usersId = users.map(u => u.userId);
			await this.notificationService.boardcastNotificationToUsers(usersId, message);
		}
		await activeEventRepo.updateNotifiedAll();
	}
}
