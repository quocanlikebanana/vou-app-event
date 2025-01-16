import { Controller, Get, Param } from '@nestjs/common';
import { EventService } from './event.service';

@Controller('/partner/event')
export class PartnerEventController {
    constructor(
        private readonly eventService: EventService
    ) { }

    @Get('/:partnerId')
    async getQuery(@Param('partnerId') partnerId: string) {
        return await this.eventService.getEventOfPartner(partnerId);
    }
}