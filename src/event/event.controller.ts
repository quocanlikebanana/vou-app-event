import { Controller, Post, Body, Sse } from '@nestjs/common';
import { EventService } from './services/event.service';
import { CreateNewEventParam, GiveTurnParam, JoinEventParam, LeaveEventParam, LikeEventParam, ReduceTurnParam, UnlikeEventParam, UpdateEventInfoParam, ValidateEventApprovalParam } from './param/event.param';

@Controller()
export class EventController {
    constructor(private readonly eventService: EventService) { }

    @Post('/partner/create')
    async createNewEvent(@Body() createEventParam: CreateNewEventParam): Promise<{ id: string }> {
        return this.eventService.createNewEvent(createEventParam);
    }

    @Post('/partner/update')
    async updateEventInfo(@Body() updateEventParam: UpdateEventInfoParam): Promise<void> {
        await this.eventService.updateEventInfo(updateEventParam);
    }

    @Post('/partner/delete')
    async deleteEvent(@Body('eventId') eventId: string): Promise<void> {
        await this.eventService.deleteEvent(eventId);
    }

    @Post('/admin/validate')
    async validateApproval(@Body() param: ValidateEventApprovalParam): Promise<void> {
        await this.eventService.validateApproval(param);
    }

    @Post('/user/join')
    async joinEvent(@Body() joinEventParam: JoinEventParam): Promise<void> {
        await this.eventService.joinEvent(joinEventParam);
    }

    @Post('/user/leave')
    async leaveEvent(@Body() leaveEventParam: LeaveEventParam): Promise<void> {
        await this.eventService.leaveEvent(leaveEventParam);
    }

    @Post('/user/like')
    async likeEvent(@Body() likeEventParam: LikeEventParam): Promise<void> {
        await this.eventService.likeEvent(likeEventParam);
    }

    @Post('/user/unlike')
    async unlikeEvent(@Body() unlikeEventParam: UnlikeEventParam): Promise<void> {
        await this.eventService.unlikeEvent(unlikeEventParam);
    }

    @Post('/user/give-turn')
    async giveTurn(@Body() body: GiveTurnParam): Promise<void> {
        await this.eventService.giveTurn(body);
    }

    @Post('/system/reduce-turn')
    async reduceTurn(@Body() body: ReduceTurnParam): Promise<void> {
        await this.eventService.reduceTurn(body);
    }
}
