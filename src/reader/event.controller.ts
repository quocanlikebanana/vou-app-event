import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { EventService } from './event.service';
import { EventInfoPresenter, EventSmallInfoPresenter, UsersJoinedEventPresenter, UsersLikedEventPresenter } from './dto/event.presenter';
import { EventQueryParam } from './dto/event.param';

@Controller('event')
export class EventController {
    constructor(
        private readonly eventService: EventService
    ) { }

    @Get('all')
    async getAll(): Promise<EventInfoPresenter[]> {
        return await this.eventService.getAll();
    }

    @Post('query')
    async getQuery(@Body() query: EventQueryParam): Promise<EventInfoPresenter[]> {
        console.log(query);
        return await this.eventService.getQuery(query);
    }

    @Get(':id')
    async getInfo(@Param('id') id: string): Promise<EventInfoPresenter> {
        return await this.eventService.getInfo(id);
    }

    @Get(':id/small')
    async getSmallInfo(@Param('id') id: string): Promise<EventSmallInfoPresenter> {
        return await this.eventService.getSmallInfo(id);
    }

    @Get(':id/users/joined')
    async getUsersJoined(@Param('id') id: string): Promise<UsersJoinedEventPresenter> {
        console.log('joined');

        return await this.eventService.getUsersJoined(id);
    }

    @Get(':id/users/liked')
    async getUsersLiked(@Param('id') id: string): Promise<UsersLikedEventPresenter> {
        return await this.eventService.getUsersLiked(id);
    }
}