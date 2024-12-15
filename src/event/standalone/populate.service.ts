import { Injectable } from '@nestjs/common';
import { EventService } from '../services/event.service';
import { mockCreateEventParams } from './mock';

@Injectable()
export class PopulateService {
    constructor(
        private readonly eventService: EventService
    ) { }

    async populate() {
        for (const event of mockCreateEventParams) {
            await this.eventService.createNewEvent(event);
        }
    }
}
