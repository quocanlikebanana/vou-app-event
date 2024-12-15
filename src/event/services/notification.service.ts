import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
    async sendNotificationToUsers(users: string[], message: string, payload?: object) {
        console.log('Sending notification to users:', users, 'with message:', message, payload);
    }

    async sendNotificationToPartner(partnerId: string, message: string, payload?: object) {
        console.log('Sending notification to partner:', partnerId, 'with message:', message, payload);
    }

    async boardcastNotificationToAdmins(message: string, payload?: object) {
        console.log('Sending notification to admins with message:', message, payload);
    }
}
