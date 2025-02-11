export type EventStatus = "PENDING" | "APPROVED" | "REJECTED";

export type EventData = {
	name: string;
	id: string;
	description: string;
	image: string;
	eventStatus: EventStatus;
	startDate: Date;
	endDate: Date;
	partnerId: string;
	hoursLeftToAnnounce: number;
}