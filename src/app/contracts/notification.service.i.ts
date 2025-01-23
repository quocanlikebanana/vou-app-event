export abstract class INotificationService {
	abstract boardcastNotificationToUsers(users: string[], message: string): void;
	abstract boardcastNotificationToRole(role: "ADMIN" | "USER" | "PARTNER", message: string): void;
}
