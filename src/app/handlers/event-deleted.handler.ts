import { EventDeletedDomainEvent } from "src/domain/event/event/event-deleted.de";
import { INotificationService } from "../services/notification.service.i";
import { IDomainEventHandler } from "src/common/domain/domain-event-handler.i";

export class EventDeletedHandler implements IDomainEventHandler<EventDeletedDomainEvent> {
	constructor(
		private readonly notificationService: INotificationService
	) { }

	async handle(event: EventDeletedDomainEvent): Promise<void> {
		await this.notificationService.boardcastNotificationToRole("ADMIN", `Event ${event.event.props.name} has been deleted`);
		await this.notificationService.boardcastNotificationToRole("USER", `Event ${event.event.props.name} has been deleted`);
	}
}