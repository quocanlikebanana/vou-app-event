import { DomainError } from "src/common/error/domain.error";
import { EventAggregate } from "../event/core/event.agg";
import { ActiveEventFullDTO, ActiveEventStatus } from "./active-event.dto";

/**
 * ----ABOUT_TO_START---START_DATE---END_DATE---- 
 */

export class ActiveEventService {
	static evaluateActiveState(event: EventAggregate): ActiveEventFullDTO {
		const now = new Date();
		const aboutToStart = new Date(event.props.startDate.getTime() - event.props.aboutToStartMark);
		const activeEventFull: ActiveEventFullDTO = {
			eventId: event.id,
			hasNotified: false,
			status: ActiveEventStatus.COMING,
			eventName: event.props.name,
			startDate: event.props.startDate,
			endDate: event.props.endDate,
		}
		if (now < aboutToStart) {
			activeEventFull.status = ActiveEventStatus.COMING;
		}
		else if (now < event.props.startDate) {
			activeEventFull.status = ActiveEventStatus.ABOUT_TO_START;
		}
		else if (now < event.props.endDate) {
			activeEventFull.status = ActiveEventStatus.STARTED;
		}
		else {
			activeEventFull.status = ActiveEventStatus.ENDED;
		}
		return activeEventFull;
	}

	static getNotificationMessageFromActiveEvent(activeEventFull: ActiveEventFullDTO) {
		switch (activeEventFull.status) {
			case ActiveEventStatus.COMING:
				return `Event ${activeEventFull.eventName} is coming`;
			case ActiveEventStatus.ABOUT_TO_START:
				return `Event ${activeEventFull.eventName} is about to start`;
			case ActiveEventStatus.STARTED:
				return `Event ${activeEventFull.eventName} has started`;
			case ActiveEventStatus.ENDED:
				return `Event ${activeEventFull.eventName} has ended`;
			default:
				throw new DomainError('Invalid status');
		}
	}
}