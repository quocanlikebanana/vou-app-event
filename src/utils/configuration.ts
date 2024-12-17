import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

export default () => ({
    port: parseInt(process.env.PORT ?? "3000", 10),
    rbmq: {
        host: process.env.RABBITMQ_HOST || "127.0.0.1",
        port: parseInt(process.env.RABBITMQ_PORT ?? "5672", 10),
        event_queue: process.env.EVENT_QUEUE || "event_queue",
    },
});

@Injectable()
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

    get logDir(): string | null {
        return this.config.get<string>('LOG_DIR') ?? null;
    }
}