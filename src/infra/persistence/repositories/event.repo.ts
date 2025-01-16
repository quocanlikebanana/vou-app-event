import { EventAggregate } from "src/event/domain/event.agg";
import { IEventRepository } from "src/event/repository/event.repo.i";
import { PrismaService } from "../prisma.service";
import { CreateEventDTO } from "src/event/dto/event.dto";
import { EventStatus } from "src/common/type";
import { UserJoinEntity } from "src/event/domain/user-join.entity";
import { UserLikeEntity } from "src/event/domain/user-like.entity";
import { $Enums } from "@prisma/client";
import { DomainError } from "src/common/domain.error";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export default class EventRepository implements IEventRepository {
    constructor(
        private readonly prismaService: PrismaService
    ) { }

    private convertToAggregate(event: {
        User_Join_Event: {
            userId: string;
            eventId: string;
            turn: number;
            id: string;
        }[];
        User_Like_Event: {
            userId: string;
            eventId: string;
            id: string;
        }[];
    } & {
        name: string;
        description: string;
        image: string;
        startDate: Date;
        endDate: Date;
        turnsPerDay: number;
        partnerId: string;
        eventStatus: $Enums.EventStatus;
        id: string;
    }): EventAggregate {
        const usersJoin: UserJoinEntity[] = event.User_Join_Event.map(x => new UserJoinEntity({
            userId: x.userId,
            eventId: x.eventId,
            turn: x.turn,
        }, x.id));
        const usersLike: UserLikeEntity[] = event.User_Like_Event.map(x => new UserLikeEntity({
            userId: x.userId,
            eventId: x.eventId,
        }));
        const createEventDTO: CreateEventDTO = {
            name: event.name,
            description: event.description,
            image: event.image,
            eventStatus: event.eventStatus as EventStatus,
            startDate: event.startDate,
            endDate: event.endDate,
            turnsPerDay: event.turnsPerDay,
            partnerId: event.partnerId,
            usersJoin: usersJoin,
            usersLike: usersLike,
        };
        return EventAggregate.create(createEventDTO, event.id);
    }

    async create(event: EventAggregate): Promise<{ id: string; }> {
        const res = await this.prismaService.event.create({
            data: {
                id: event.id,
                name: event.props.name,
                description: event.props.description,
                image: event.props.image,
                eventStatus: event.props._eventStatusContext.getState() as $Enums.EventStatus,
                startDate: event.props.startDate,
                endDate: event.props.endDate,
                turnsPerDay: event.props.turnsPerDay,
                partnerId: event.props.partnerId,
            }
        });
        return { id: res.id };
    }

    async updateInfo(event: EventAggregate): Promise<void> {
        await this.prismaService.event.update({
            where: { id: event.id },
            data: {
                name: event.props.name,
                description: event.props.description,
                image: event.props.image,
                eventStatus: event.props._eventStatusContext.getState() as $Enums.EventStatus,
                startDate: event.props.startDate,
                endDate: event.props.endDate,
                turnsPerDay: event.props.turnsPerDay,
                partnerId: event.props.partnerId,
            }
        });
    }

    async delete(eventId: string): Promise<void> {
        try {
            await this.prismaService.event.delete({
                where: { id: eventId }
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
                throw new DomainError("Event not found");
            } else {
                throw error;
            }
        }
    }

    async addUserJoin(userJoin: UserJoinEntity): Promise<void> {
        try {
            await this.prismaService.user_Join_Event.create({
                data: {
                    userId: userJoin.props.userId,
                    eventId: userJoin.props.eventId,
                    turn: userJoin.props.turn,
                }
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
                throw new DomainError("User already joined event");
            } else {
                throw error;
            }
        }
    }

    async updateUserJoinTurn(event: EventAggregate): Promise<void> {
        const usersJoin = event.props.usersJoin;
        console.log(usersJoin);
        const prismaUsersJoin = usersJoin.map(x => this.prismaService.user_Join_Event.update({
            where: {
                id: x.id
            },
            data: {
                turn: x.props.turn
            }
        }));
        await this.prismaService.$transaction(prismaUsersJoin);
    }

    async deleteUserJoin(userId: string, eventId: string): Promise<void> {
        await this.prismaService.user_Join_Event.deleteMany({
            where: {
                userId: userId,
                eventId: eventId
            }
        });
    }

    async addUserLike(userLike: UserLikeEntity): Promise<void> {
        try {
            await this.prismaService.user_Like_Event.create({
                data: {
                    userId: userLike.props.userId,
                    eventId: userLike.props.eventId,
                }
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
                throw new DomainError("User already liked event");
            } else {
                throw error;
            }
        }
    }

    async deleteUserLike(userId: string, eventId: string): Promise<void> {
        await this.prismaService.user_Like_Event.deleteMany({
            where: {
                userId: userId,
                eventId: eventId
            }
        });
    }

    async getById(eventId: string): Promise<EventAggregate> {
        const event = await this.prismaService.event.findUnique({
            where: { id: eventId },
            include: {
                User_Join_Event: true,
                User_Like_Event: true,
            }
        });
        if (!event) {
            throw new DomainError("Event not found");
        }
        return this.convertToAggregate(event);
    }

    async getHappeningEvents(): Promise<EventAggregate[]> {
        const now = new Date();
        const events = await this.prismaService.event.findMany({
            where: {
                eventStatus: EventStatus.APPROVED,
                startDate: {
                    lte: now
                },
            },
            include: {
                User_Join_Event: true,
                User_Like_Event: true,
            }
        });
        return events.map(x => this.convertToAggregate(x));
    }

    async getUsersJoinedEvent(eventId: string): Promise<UserJoinEntity[]> {
        const usersJoin = await this.prismaService.user_Join_Event.findMany({
            where: { eventId: eventId }
        });
        return usersJoin.map(x => new UserJoinEntity({
            userId: x.userId,
            eventId: x.eventId,
            turn: x.turn,
        }));
    }
}