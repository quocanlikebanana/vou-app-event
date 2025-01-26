import { INotificationService } from "src/app/services/notification.service.i";

export class NotificationService implements INotificationService {
	async boardcastNotificationToUser(user: string, message: string): Promise<void> {
		console.log(`Broadcasting message: ${message} to user: ${user}`);
	}

	async boardcastNotificationToUsers(users: string[], message: string): Promise<void> {
		console.log(`Broadcasting message: ${message} to users (array): ${users}`);
	}

	async boardcastNotificationToRole(role: "ADMIN" | "USER" | "PARTNER", message: string): Promise<void> {
		console.log(`Broadcasting message: ${message} to role: ${role}`);
	}
}