export enum ActiveEventStatus {
	COMING = 'COMING',
	ABOUT_TO_START = 'ABOUT_TO_START',
	STARTED = 'STARTED',
	ENDED = 'ENDED'
}

export type ActiveEventFullDTO = {
	eventId: string;
	status: ActiveEventStatus;
	hasNotified: boolean;
	eventName: string;
	startDate: Date;
	endDate: Date;
};

export type ActiveEventProps = {
	eventId: string;
	status: ActiveEventStatus;
	hasNotified: boolean;
};