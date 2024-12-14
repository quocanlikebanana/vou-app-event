import { Injectable } from '@nestjs/common';
import { IEventRepository } from './domain/event.repo.i';
import { CreateEventDTO } from './dto/create-event.dto';
import { EventAggregate } from './domain/event.agg';
import { UpdateEventDTO } from './dto/update-event.dto';

@Injectable()
export class EventService {
    constructor(
        private readonly eventRepository: IEventRepository
    ) { }

    async createEvent(event: CreateEventDTO): Promise<EventAggregate> {
        return this.eventRepository.create(event);
    }

    async updateEvent(event: UpdateEventDTO): Promise<void> {
        return this.eventRepository.update(event);
    }

    async deleteEvent(eventId: string): Promise<void> {
        return this.eventRepository.delete(eventId);
    }

    async approveEvent(eventId: string): Promise<void> {
        return this.eventRepository.approve(eventId);
    }

    async rejectEvent(eventId: string): Promise<void> {
        return this.eventRepository.reject(eventId);
    }
}
