import { ConfigService } from "@nestjs/config";

export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    rbmq: {
        host: process.env.RABBITMQ_HOST || "127.0.0.1",
        port: parseInt(process.env.RABBITMQ_PORT, 10) || 5672,
        event_queue: process.env.EVENT_QUEUE || "event_queue",
    },
});


export class ConfigurationService {
    constructor(
        private readonly config: ConfigService
    ) { }

    get port(): number {
        return this.config.get<number>('PORT', 3000);
    }

    get rbmqHost(): string {
        return this.config.get<string>('RABBITMQ_HOST', '127.0.0.1');
    }

    get rbmqPort(): number {
        return this.config.get<number>('RABBITMQ_PORT', 5672);
    }

    get eventQueue(): string {
        return this.config.get<string>('EVENT_QUEUE', 'event_queue');
    }
}