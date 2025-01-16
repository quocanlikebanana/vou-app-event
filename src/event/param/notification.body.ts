export class NotificationBody {
    sender_id: string;
    content: string;
    type?: string = "info";
    title?: string;
    receiver_ids?: string[];
    roles?: string[];
}