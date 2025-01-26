export abstract class INotificationService {
	abstract boardcastNotificationToUsers(users: string[], message: string): Promise<void>;
	abstract boardcastNotificationToUser(user: string, message: string): Promise<void>;
	abstract boardcastNotificationToRole(role: "ADMIN" | "USER" | "PARTNER", message: string): Promise<void>;
}
