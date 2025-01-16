import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { EventQueryParam, UserEventStatusQuery } from 'src/reader/dto/event.param';
import { EventInfoResult, EventInfoUserResult, EventSmallInfoResult, UserInfoInEventResult, UsersJoinedEventResult, UsersLikedEventResult } from 'src/reader/dto/event.result';
import IEventQuery from 'src/reader/query/event.query.i';
import { EventStatus } from 'src/common/type';
import { DomainError } from 'src/common/domain.error';

@Injectable()
export default class EventQuery implements IEventQuery {
    constructor(
        private readonly prismaService: PrismaService
    ) { }

    async getAll(): Promise<EventInfoResult[]> {
        const events = await this.prismaService.event.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                image: true,
                startDate: true,
                endDate: true,
                turnsPerDay: true,
                partnerId: true,
                eventStatus: true,
            },
        });
        return events.map(event => ({
            ...event,
            eventStatus: event.eventStatus as EventStatus,
        }));
    }

    async getQuery(query: EventQueryParam): Promise<EventInfoResult[]> {
        const filterStatus = query.statusFilter.map(filter => filter as unknown as EventStatus);
        const now = new Date();

        const events = await this.prismaService.event.findMany({
            skip: (query.page - 1) * query.perPage,
            take: query.perPage,
            where: {
                name: query.searchName !== '' ? {
                    contains: query.searchName,
                    mode: "insensitive",
                } : undefined,
                eventStatus: {
                    in: filterStatus.length > 0 ? filterStatus : undefined,
                },
                OR: query.userStatusFilter.length > 0 ? [{
                    startDate: query.userStatusFilter.includes(UserEventStatusQuery.UPCOMING) ? {
                        gt: now,
                    } : undefined,
                    AND: [{
                        startDate: query.userStatusFilter.includes(UserEventStatusQuery.STARTING) ? {
                            lte: now,
                        } : undefined,
                        endDate: query.userStatusFilter.includes(UserEventStatusQuery.STARTING) ? {
                            gte: now,
                        } : undefined,
                    }],
                    endDate: query.userStatusFilter.includes(UserEventStatusQuery.ENDED) ? {
                        lt: now,
                    } : undefined,
                }] : undefined,
            },
            orderBy: query.sorts.map(sort => ({
                [sort.field]: sort.isAsc ? 'asc' : 'desc',
            })),
            select: {
                id: true,
                name: true,
                description: true,
                image: true,
                startDate: true,
                endDate: true,
                turnsPerDay: true,
                partnerId: true,
                eventStatus: true,
            },
        });

        return events.map(event => ({
            ...event,
            eventStatus: event.eventStatus as EventStatus,
        }));
    }

    async getQueryFromUser(query: EventQueryParam, userId: string): Promise<EventInfoUserResult[]> {
        const filterStatus = query.statusFilter.map(filter => filter as unknown as EventStatus);
        const now = new Date();

        const events = await this.prismaService.event.findMany({
            skip: (query.page - 1) * query.perPage,
            take: query.perPage,
            where: {
                name: query.searchName !== '' ? {
                    contains: query.searchName,
                    mode: "insensitive",
                } : undefined,
                eventStatus: {
                    in: filterStatus.length > 0 ? filterStatus : undefined,
                },
                OR: query.userStatusFilter.length > 0 ? [{
                    startDate: query.userStatusFilter.includes(UserEventStatusQuery.UPCOMING) ? {
                        gt: now,
                    } : undefined,
                    AND: [{
                        startDate: query.userStatusFilter.includes(UserEventStatusQuery.STARTING) ? {
                            lte: now,
                        } : undefined,
                        endDate: query.userStatusFilter.includes(UserEventStatusQuery.STARTING) ? {
                            gte: now,
                        } : undefined,
                    }],
                    endDate: query.userStatusFilter.includes(UserEventStatusQuery.ENDED) ? {
                        lt: now,
                    } : undefined,
                }] : undefined,
            },
            orderBy: query.sorts.map(sort => ({
                [sort.field]: sort.isAsc ? 'asc' : 'desc',
            })),
            select: {
                id: true,
                name: true,
                description: true,
                image: true,
                startDate: true,
                endDate: true,
                turnsPerDay: true,
                partnerId: true,
                eventStatus: true,
                User_Like_Event: {
                    where: {
                        userId,
                    },
                    select: {
                        userId: true,
                    },
                }
            },
        });

        return events.map(event => ({
            ...event,
            eventStatus: event.eventStatus as EventStatus,
            hasLiked: event.User_Like_Event.length > 0,
        }));
    }

    async getInfo(id: string): Promise<EventInfoResult> {
        const event = await this.prismaService.event.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                description: true,
                image: true,
                startDate: true,
                endDate: true,
                turnsPerDay: true,
                partnerId: true,
                eventStatus: true,
            },
        });
        if (!event) {
            throw new DomainError(`Event with id ${id} not found`);
        }
        return {
            ...event,
            eventStatus: event.eventStatus as EventStatus,
        };
    }

    async getSmallInfo(id: string): Promise<EventSmallInfoResult> {
        const event = await this.prismaService.event.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                image: true,
                eventStatus: true,
                startDate: true,
                endDate: true,
            },
        });
        if (!event) {
            throw new DomainError(`Event with id ${id} not found`);
        }
        return {
            ...event,
            eventStatus: event.eventStatus as EventStatus,
        };
    }

    async getUsersJoined(id: string): Promise<UsersJoinedEventResult> {
        const event = await this.prismaService.event.findUnique({
            where: { id },
            select: {
                User_Join_Event: {
                    select: {
                        userId: true,
                        turn: true,
                    },
                },
            },
        });
        if (!event) {
            throw new DomainError(`Event with id ${id} not found`);
        }
        return {
            userJoin: event.User_Join_Event.map(join => ({
                userId: join.userId,
                turn: join.turn,
            })),
        };
    }

    async getUsersLiked(id: string): Promise<UsersLikedEventResult> {
        const event = await this.prismaService.event.findUnique({
            where: { id },
            select: {
                User_Like_Event: {
                    select: {
                        userId: true,
                    },
                },
            },
        });
        if (!event) {
            throw new DomainError(`Event with id ${id} not found`);
        }
        return {
            userLiked: event.User_Like_Event.map(like => ({
                userId: like.userId,
            })),
        };
    }

    async getUserInfoInEvent(id: string, userId: string): Promise<UserInfoInEventResult> {
        const userJoinEvent = await this.prismaService.user_Join_Event.findFirst({
            where: { eventId: id, userId },
            include: {
                Event: {
                    include: {
                        User_Like_Event: {
                            where: { userId },
                        },
                    }
                }
            }
        });
        if (!userJoinEvent) {
            throw new DomainError(`User with id ${userId} not found in event with id ${id}`);
        }
        return {
            userId: userJoinEvent.userId,
            turn: userJoinEvent.turn,
            hasLiked: userJoinEvent.Event.User_Like_Event.length > 0,
        };
    }

    async getEventOfPartner(partnerId: string): Promise<EventInfoResult[]> {
        const events = await this.prismaService.event.findMany({
            where: { partnerId },
            select: {
                id: true,
                name: true,
                description: true,
                image: true,
                startDate: true,
                endDate: true,
                turnsPerDay: true,
                partnerId: true,
                eventStatus: true,
            },
        });
        return events.map(event => ({
            ...event,
            eventStatus: event.eventStatus as EventStatus,
        }));
    }
}