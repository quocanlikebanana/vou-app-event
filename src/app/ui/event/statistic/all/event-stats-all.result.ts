export class EventStatsAllResult {
	numberOfEvents: {
		total: number;
		aboutToStart: number;
		ongoing: number;
		ended: number;
		pendingApproval: number;
		rejected: number;
		approved: number;
	};
	numberOfPartner: number;
	top: {
		mostCreatedPartner: {
			id: string;
			name: string;
			eventCount: number;
		}[];
		mostFollowedEvents: {
			id: string;
			name: string;
			followCount: number;
		}[];
	};
}