import { Controller, Get, Query } from '@nestjs/common';
import { StatsService } from './stats.service';

@Controller('/unauth/event/stats')
export class StatsController {
    constructor(
        private readonly statsService: StatsService
    ) { }

    @Get('events-by-day')
    async getEventsGroupedByDay(
        @Query('start') start: string,
        @Query('end') end: string
    ): Promise<any[]> {
        return this.statsService.getEventsGroupedByDay(
            new Date(start),
            new Date(end)
        );
    }

    @Get('top-joined-events')
    async topMostJoinedEvents(
        @Query('top') top: number
    ): Promise<any[]> {
        return this.statsService.topMostJoinedEvents(top);
    }

    @Get('top-created-events')
    async topMostCreatedEvents(
        @Query('top') top: number
    ): Promise<any[]> {
        return this.statsService.topMostCreatedEvents(top);
    }

    @Get('event-aggregate-stats')
    async getAllEventAggregateStats(): Promise<any> {
        return this.statsService.getAllEventAggregateStats();
    }

    @Get('event-aggregate-stats')
    async getEventAggregateStats(
        @Query('eventId') eventId: string
    ): Promise<any> {
        return this.statsService.getEventAggregateStats(eventId);
    }

    @Get('partner-top-most-joined-events')
    async getPartnerTopMostJoinedEvents(
        @Query('top') top: number,
        @Query('partnerId') partnerId: string
    ): Promise<any[]> {
        return this.statsService.topMostJoinedEventsOfPartner(top, partnerId);
    }
}
