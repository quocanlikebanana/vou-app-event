export abstract class IScheduleService {
	abstract addNotificationJobDate(eventId: string, date: Date): void;
	abstract removeJob(eventId: string): void;
}