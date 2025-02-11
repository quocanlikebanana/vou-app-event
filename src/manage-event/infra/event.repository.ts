import { PrismaService } from "src/infra/prisma/prisma.service";
import { EventData } from "../dto/data/event.data";
import { GameOfEventData } from "../dto/data/game-of-event.data";
import { EventModel } from "../dto/model/event.model";
import { GameOfEventModel } from "../dto/model/game-of-event.model";


export class EventRepository {
	constructor(
		private readonly prismaService: PrismaService
	) { }

	async get(id: string): Promise<EventModel | null> {
		const event = await this.prismaService.event.findFirst({
			where: {
				id,
			},
			include: {
				Game_Of_Event: true,
			},
		});
		if (!event) {
			return null;
		}
		const eventData: EventData = { ...event };
		const gameOfEventsData: GameOfEventData[] = event.Game_Of_Event.map(game => ({ ...game }));
		const gameModels: GameOfEventModel[] = gameOfEventsData.map(gameData => new GameOfEventModel(gameData));
		const eventModel = new EventModel(eventData, gameModels);
		return eventModel;
	}

	async create(eventModel: EventModel): Promise<{ id: string }> {
		const result = await this.prismaService.$transaction([
			this.prismaService.event.create({
				data: eventModel.getData(),
			}),
			this.prismaService.game_Of_Event.createMany({
				data: eventModel.getGames().map(game => game.getData()),
			})
		]);
		return { id: result[0].id };
	}

	async update(eventModel: EventModel): Promise<void> {
		await this.prismaService.$transaction([
			this.prismaService.event.update({
				where: {
					id: eventModel.getData().id,
				},
				data: eventModel.getData(),
			}),
			this.prismaService.game_Of_Event.deleteMany({
				where: {
					eventId: eventModel.getData().id,
				},
			}),
			this.prismaService.game_Of_Event.createMany({
				data: eventModel.getGames().map(game => game.getData()),
			})
		]);
	}

	async delete(eventId: string): Promise<void> {
		await this.prismaService.$transaction([
			this.prismaService.event.delete({
				where: {
					id: eventId,
				},
			}),
			this.prismaService.game_Of_Event.deleteMany({
				where: {
					eventId,
				},
			})
		]);
	}
}