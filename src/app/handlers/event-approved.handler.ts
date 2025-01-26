import { Injectable } from "@nestjs/common";
import { IDomainEventHandler } from "src/common/domain/domain-event-handler.i";
import { IUnitOfWork } from "src/common/domain/unit-of-work.i";
import { IActiveEventRepository } from "src/domain/active-event-service/active-event.repo.i";
import { ActiveEventService } from "src/domain/active-event-service/active-event.service";
import { EventApprovedDomainEvent } from "src/domain/event/event/event-approved.de";
import { EventStatus } from "src/domain/event/others/event-status.enum";
import { INotificationService } from "../services/notification.service.i";

@Injectable()
export class PrepareNotificationToSubcribedUsersHandler implements IDomainEventHandler<EventApprovedDomainEvent> {
	constructor(
		private readonly unitOfWork: IUnitOfWork
	) { }

	async handle(event: EventApprovedDomainEvent): Promise<void> {
		if (event.event.props.eventStatus === EventStatus.APPROVED) {
			const activeEventRepo = this.unitOfWork.getRepository(IActiveEventRepository);
			const activeEvent = ActiveEventService.evaluateActiveState(event.event);
			await activeEventRepo.create(activeEvent);
			await this.unitOfWork.commit();
		}
	}
}

@Injectable()
export class SendApprovalNotificationToPartnerHandler implements IDomainEventHandler<EventApprovedDomainEvent> {
	constructor(
		private readonly notificationService: INotificationService
	) { }

	async handle(event: EventApprovedDomainEvent): Promise<void> {
		await this.notificationService.boardcastNotificationToUser(event.event.props.partnerId, `Event ${event.event.props.name} has been approved`);
	}
}