import { Injectable } from '@nestjs/common';
import IEventQuery from './query/event.query.i';
import { EventInfoPresenter, EventSmallInfoPresenter, UsersJoinedEventPresenter as UsersJoinEventPresenter, UsersLikedEventPresenter } from './dto/event.presenter';
import { EventStatus } from 'src/common/type';
import { DomainError } from 'src/common/domain.error';
import { EventInfoResult } from './dto/event.result';
import { EventQueryParam } from './dto/event.param';

function evalEventStatusMessage(eventInfo: { eventStatus: EventStatus, startDate: Date, endDate: Date }): string {
    let eventStatus = eventInfo.eventStatus.toString();
    if (eventInfo.eventStatus === EventStatus.APPROVED) {
        const now = new Date();
        if (eventInfo.startDate >= now) {
            eventStatus = "UPCOMING";
        }
        else if (eventInfo.startDate < now && eventInfo.endDate > now) {
            eventStatus = "STARTED";
        }
        else if (eventInfo.endDate <= now) {
            eventStatus = "ENDED";
        }
        else {
            throw new DomainError("Invalid event status");
        }
    }
    return eventStatus;
}

function transformEventInfo(eventInfoResult: EventInfoResult): EventInfoPresenter {
    const eventStatusMessage = evalEventStatusMessage(eventInfoResult);
    return { ...eventInfoResult, eventStatus: eventStatusMessage };
};

@Injectable()
export class EventService {
    constructor(
        private readonly eventQuery: IEventQuery
    ) { }

    async getAll(): Promise<EventInfoPresenter[]> {
        const res = this.eventQuery.getAll();
        const presenter: EventInfoPresenter[] = (await res).map(transformEventInfo);
        return presenter;
    }

    async getQuery(query: EventQueryParam): Promise<EventInfoPresenter[]> {
        const res = await this.eventQuery.getQuery(query);
        const presenter: EventInfoPresenter[] = res.map(transformEventInfo);
        return presenter;
    }

    async getQueryFromUser(query: EventQueryParam, userId: string) {
        const res = await this.eventQuery.getQueryFromUser(query, userId);
        return res;
    }

    async getInfo(id: string): Promise<EventInfoPresenter> {
        const res = await this.eventQuery.getInfo(id);
        const presenter: EventInfoPresenter = transformEventInfo(res);
        return presenter;
    }

    async getSmallInfo(id: string): Promise<EventSmallInfoPresenter> {
        const res = await this.eventQuery.getSmallInfo(id);
        const presenter: EventSmallInfoPresenter = { ...res, eventStatus: evalEventStatusMessage(await res) };
        return presenter;
    }

    async getUsersJoined(id: string): Promise<UsersJoinEventPresenter> {
        return await this.eventQuery.getUsersJoined(id);
    }

    async getUsersLiked(id: string): Promise<UsersLikedEventPresenter> {
        return await this.eventQuery.getUsersLiked(id);
    }

    async getUserInfoInEvent(id: string, userId: string) {
        return await this.eventQuery.getUserInfoInEvent(id, userId);
    }

    async getEventOfPartner(partnerId: string) {
        return await this.eventQuery.getEventOfPartner(partnerId);
    }
}
