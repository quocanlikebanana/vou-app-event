import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { EventService } from './event.service';
import { EventQueryParamFromUser } from './dto/event.param';

@Controller('/user/event')
export class UserEventController {
    constructor(
        private readonly eventService: EventService
    ) { }

    @Post('query')
    async getQuery(@Body() query: EventQueryParamFromUser) {
        const { userId, ...rest } = query;
        return await this.eventService.getQueryFromUser(rest, query.userId);
    }

    @Get('/info/:eventId/:userId')
    async getInfo(@Param('eventId') eventId: string, @Param('userId') userId: string) {
        return await this.eventService.getUserInfoInEvent(eventId, userId);
    }
}