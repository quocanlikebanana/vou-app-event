import { IDomainEventHandler } from "src/common/domain/domain-event-handler.i";
import { INotificationService } from "../services/notification.service.i";
import { EventCreatedDomainEvent } from "src/domain/event/event/event-created.de";

export class NotifyAdminsWhenEventCreatedHandler implements IDomainEventHandler<EventCreatedDomainEvent> {
	constructor(
		private readonly notificationService: INotificationService
	) { }

	async handle(event: EventCreatedDomainEvent): Promise<void> {
		await this.notificationService.boardcastNotificationToRole("ADMIN", `New event created: ${event.event.props.name}`);
	}
}