import { INotificationService } from "src/app/services/notification.service.i";

export class NotificationService implements INotificationService {
	async boardcastNotificationToUsers(users: string[], message: string): Promise<void> {
		console.log(`Broadcasting message: ${message} to users: ${users}`);
	}
	
	async boardcastNotificationToRole(role: "ADMIN" | "USER" | "PARTNER", message: string): Promise<void> {
		console.log(`Broadcasting message: ${message} to role: ${role}`);
	}
}