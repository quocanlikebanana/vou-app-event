import { Controller, Post, Body } from '@nestjs/common';
import { EventService } from './services/event.service';
import { CreateEventParam, JoinEventParam, LeaveEventParam, LikeEventParam, UnlikeEventParam, UpdateEventParam, ValidateEventApprovalParam } from './param/event.param';

@Controller()
export class EventController {
    constructor(private readonly eventService: EventService) { }

    @Post('/create')
    async createNewEvent(@Body() createEventParam: CreateEventParam): Promise<{ id: string }> {
        console.log('createEventParam', createEventParam);
        return this.eventService.createNewEvent(createEventParam);
    }

    @Post('/update')
    async updateEventInfo(@Body() updateEventParam: UpdateEventParam): Promise<void> {
        await this.eventService.updateEventInfo(updateEventParam);
    }

    @Post('/validate')
    async validateApproval(@Body() param: ValidateEventApprovalParam): Promise<void> {
        await this.eventService.validateApproval(param);
    }

    @Post('/join')
    async joinEvent(@Body() joinEventParam: JoinEventParam): Promise<void> {
        await this.eventService.joinEvent(joinEventParam);
    }

    @Post('/leave')
    async leaveEvent(@Body() leaveEventParam: LeaveEventParam): Promise<void> {
        await this.eventService.leaveEvent(leaveEventParam);
    }

    @Post('/like')
    async likeEvent(@Body() likeEventParam: LikeEventParam): Promise<void> {
        await this.eventService.likeEvent(likeEventParam);
    }

    @Post('/unlike')
    async unlikeEvent(@Body() unlikeEventParam: UnlikeEventParam): Promise<void> {
        await this.eventService.unlikeEvent(unlikeEventParam);
    }
}
