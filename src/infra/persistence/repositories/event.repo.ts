import { EventAggregate } from "src/event/domain/event.agg";
import { IEventRepository } from "src/event/repository/event.repo.i";
import { PrismaService } from "../prisma.service";
import { CreateEventDTO } from "src/event/dto/event.dto";
import { EventStatus } from "src/common/type";
import { UserJoinEntity } from "src/event/domain/user-join.entity";
import { UserLikeEntity } from "src/event/domain/user-like.entity";

export default class EventRepository implements IEventRepository {
    constructor(
        private readonly prismaService: PrismaService
    ) { }

    async create(event: EventAggregate): Promise<{ id: string; }> {
        const res = await this.prismaService.event.create({
            data: {
                id: event.id,
                name: event.props.name,
                description: event.props.description,
                image: event.props.image,
                eventStatus: event.props._eventStatusContext.getState(),
                startDate: event.props.startDate,
                endDate: event.props.endDate,
                turnsPerDay: event.props.turnsPerDay,
                partnerId: event.props.partnerId,
            }
        });
        return { id: res.id };
    }

    async updateInfo(event: EventAggregate): Promise<void> {
        this.prismaService.event.update({
            where: { id: event.id },
            data: {
                name: event.props.name,
                description: event.props.description,
                image: event.props.image,
                eventStatus: event.props._eventStatusContext.getState(),
                startDate: event.props.startDate,
                endDate: event.props.endDate,
                turnsPerDay: event.props.turnsPerDay,
                partnerId: event.props.partnerId,
            }
        });
    }

    async delete(eventId: string): Promise<void> {
        await this.prismaService.event.delete({
            where: { id: eventId }
        });
    }

    async addUserJoin(userJoin: UserJoinEntity): Promise<void> {
        await this.prismaService.user_Join_Event.create({
            data: {
                userId: userJoin.props.userId,
                eventId: userJoin.props.eventId,
                turn: userJoin.props.turn,
            }
        });
    }

    async updateUserJoinTurn(event: EventAggregate): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async deleteUserJoin(userId: string, eventId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async addUserLike(userLike: UserLikeEntity): Promise<void> {
        await this.prismaService.user_Like_Event.create({
            data: {
                userId: userLike.props.userId,
                eventId: userLike.props.eventId,
            }
        });
    }

    async deleteUserLike(userId: string, eventId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async getById(eventId: string): Promise<EventAggregate | null> {
        const event = await this.prismaService.event.findUnique({
            where: { id: eventId },
            include: {
                User_Join_Event: true,
                User_Like_Event: true,
            }
        });
        if (!event) {
            return null;
        }
        const usersJoin: UserJoinEntity[] = event.User_Join_Event.map(x => new UserJoinEntity({
            userId: x.userId,
            eventId: x.eventId,
            turn: x.turn,
        }));

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
        }
        return EventAggregate.create(createEventDTO, event.id);
    }

    async getHappeningEvents(): Promise<EventAggregate[]> {
        throw new Error("Method not implemented.");
    }

    async getUsersJoinedEvent(eventId: string): Promise<UserJoinEntity[]> {
        throw new Error("Method not implemented.");
    }

}