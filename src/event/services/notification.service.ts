import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
    async sendNotificationToUsers(users: string[], message: string) {
        console.log('Sending notification to users:', users, 'with message:', message);
    }
}
