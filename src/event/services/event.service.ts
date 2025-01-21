import { Injectable } from '@nestjs/common';
import { CreateNewEventParam, GiveTurnParam, JoinEventParam, LeaveEventParam, LikeEventParam, ReduceTurnParam, UnlikeEventParam, UpdateEventInfoParam, ValidateEventApprovalParam as ValidateEventApprovalParam } from "../param/event.param";
import { EventAggregate } from '../../domain/event/core/event.agg';
import IUnitOfWork from 'src/common/unit-of-work.i';
import { EventStatus } from 'src/common/type';
import { UserJoinEntity } from '../domain/user-join.entity';
import { UserLikeEntity } from '../../domain/user-like-event/user-like.agg';
import { NotificationService } from './notification.service';
import { DomainError } from 'src/common/domain.error';

@Injectable()
export class EventService {
	constructor(
		private readonly unitOfWork: IUnitOfWork,
		private readonly notificationService: NotificationService
	) { }

	async createNewEvent(event: CreateNewEventParam): Promise<{ id: string }> {
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
		await this.notificationService.boardcastNotificationToAdmins(
			"Partner has created new event"
		);
		return res;
	}

	async updateEventInfo(event: UpdateEventInfoParam): Promise<void> {
		const { id, ...updateDto } = event;
		const eventAgg = await this.unitOfWork.eventRepository.getById(id);
		eventAgg.updateInfo(updateDto);
		await this.unitOfWork.eventRepository.updateInfo(eventAgg);
		await this.notificationService.boardcastNotificationToAdmins(
			"Partner has updated event info"
		);
	}

	async deleteEvent(eventId: string): Promise<void> {
		await this.unitOfWork.eventRepository.delete(eventId);
	}

	async validateApproval(param: ValidateEventApprovalParam): Promise<void> {
		const { eventId, isApproved } = param;
		const eventAgg = await this.unitOfWork.eventRepository.getById(eventId);
		eventAgg.validateApproval(isApproved);
		await this.unitOfWork.eventRepository.updateInfo(eventAgg);
		await this.notificationService.sendNotificationToPartner(
			eventAgg.props.partnerId,
			`Your event ${eventAgg.props.name} has been` + isApproved ? " approved" : "rejected",
		)
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

	async reduceTurn(param: ReduceTurnParam): Promise<void> {
		const event = await this.unitOfWork.eventRepository.getById(param.eventId);
		const userJoin = event.props.usersJoin.find(u => u.props.userId === param.userId);
		if (userJoin == null) {
			throw new Error("User not found in event");
		}
		userJoin.addTurn(param.turn * -1);
		await this.unitOfWork.eventRepository.updateUserJoinTurn(event);
	}

	async giveTurn(param: GiveTurnParam): Promise<void> {
		const event = await this.unitOfWork.eventRepository.getById(param.eventId);
		if (event == null) {
			throw new DomainError("Event not found");
		}
		const userGive = event.props.usersJoin.find(u => u.props.userId === param.userId);
		if (userGive == null) {
			throw new DomainError("User give not found in event");
		}
		const userTake = event.props.usersJoin.find(u => u.props.userId === param.userTakeId);
		if (userTake == null) {
			throw new DomainError("User take not found in event");
		}
		userGive.addTurn(param.turn * -1);
		userTake.addTurn(param.turn);
		await this.unitOfWork.eventRepository.updateUserJoinTurn(event);
	}
}
