import { Injectable } from '@nestjs/common';
import { CreateEventParam, JoinEventParam, LeaveEventParam, LikeEventParam, UnlikeEventParam, UpdateEventParam, ValidateEventApprovalParam as ValidateEventApprovalParam } from "../param/event.param";
import { EventAggregate } from '../domain/event.agg';
import IUnitOfWork from 'src/common/unit-of-work.i';
import { EventStatus } from 'src/common/type';
import { UserJoinEntity } from '../domain/user-join.entity';
import { UserLikeEntity } from '../domain/user-like.entity';

@Injectable()
export class EventService {
    constructor(
        private readonly unitOfWork: IUnitOfWork
    ) { }

    async createNewEvent(event: CreateEventParam): Promise<{ id: string }> {
        const eventAgg = EventAggregate.create({
            ...event,
            eventStatus: EventStatus.PENDING,
            usersJoin: [],
            usersLike: [],
        });
        const res = await this.unitOfWork.executeTransaction(async (uow) => {
            await uow.cronRepository.addStartInOneDay({
                eventId: eventAgg.id,
                notificationDate: new Date(eventAgg.props.startDate.getTime() - 24 * 60 * 60 * 1000),
            });
            await uow.cronRepository.addStartNow({
                eventId: eventAgg.id,
                notificationDate: eventAgg.props.startDate,
            });
            return await uow.eventRepository.create(eventAgg);
        });
        return res;
    }

    async updateEventInfo(event: UpdateEventParam): Promise<void> {
        const { id, ...updateDto } = event;
        const eventAgg = await this.unitOfWork.eventRepository.getById(id);
        eventAgg.update(updateDto);
        await this.unitOfWork.eventRepository.updateInfo(eventAgg);
    }

    async validateApproval(param: ValidateEventApprovalParam): Promise<void> {
        const { eventId, isApproved } = param;
        const eventAgg = await this.unitOfWork.eventRepository.getById(eventId);
        eventAgg.validateApproval(isApproved);
        await this.unitOfWork.eventRepository.updateInfo(eventAgg);
    }

    async joinEvent(param: JoinEventParam): Promise<void> {
        const event = await this.unitOfWork.eventRepository.getById(param.eventId);
        const userJoin = new UserJoinEntity({
            userId: param.userId,
            eventId: param.eventId,
            turn: event.props.turnsPerDay,
        });
        await this.unitOfWork.eventRepository.addUserJoin(userJoin);
    }

    async leaveEvent(param: LeaveEventParam): Promise<void> {
        await this.unitOfWork.eventRepository.deleteUserJoin(param.userId, param.eventId);
    }

    async likeEvent(param: LikeEventParam): Promise<void> {
        const userLike = new UserLikeEntity({
            userId: param.userId,
            eventId: param.eventId,
        });
        await this.unitOfWork.eventRepository.addUserLike(userLike);
    }

    async unlikeEvent(param: UnlikeEventParam): Promise<void> {
        await this.unitOfWork.eventRepository.deleteUserLike(param.userId, param.eventId);
    }
}
