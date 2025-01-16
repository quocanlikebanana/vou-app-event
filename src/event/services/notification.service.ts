import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { NOTIFICATION_URL } from 'src/common/env';
import { NotificationBody } from '../param/notification.body';

@Injectable()
export class NotificationService {
    constructor(
        private readonly httpService: HttpService
    ) { }

    async sendNotificationToUsers(users: string[], message: string) {
        const body: NotificationBody = {
            sender_id: 'system',
            content: message,
            receiver_ids: users,
        };
        this.httpService.post(NOTIFICATION_URL, body);
        console.log('Sending notification to users:', users, 'with message:', message);
    }

    async sendNotificationToPartner(partnerId: string, message: string) {
        const body: NotificationBody = {
            sender_id: 'system',
            content: message,
            receiver_ids: [partnerId],
        };
        this.httpService.post(NOTIFICATION_URL, body);
        console.log('Sending notification to partner:', partnerId, 'with message:', message);
    }

    async boardcastNotificationToAdmins(message: string) {
        const body: NotificationBody = {
            sender_id: 'system',
            content: message,
            roles: ['ADMIN'],
        };
        this.httpService.post(NOTIFICATION_URL, body);
        console.log('Sending notification to admins with message:', message);
    }
}
