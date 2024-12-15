import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from './event.service';
import IUnitOfWork from 'src/common/unit-of-work.i';
import { InfraModule } from 'src/infra/infra.module';
import { UnitOfWork } from 'src/infra/persistence/unitofwork';
import { CreateEventParam, JoinEventParam, LeaveEventParam, LikeEventParam, UnlikeEventParam, UpdateEventParam, ValidateEventApprovalParam } from '../param/event.param';
import { PrismaService } from 'src/infra/persistence/prisma.service';
import { EventAggregate } from '../domain/event.agg';
import { EventStatus } from '@prisma/client';

describe('EventService init', () => {
  let service: EventService;
  let prismaService: PrismaService;
  let unitofwork: UnitOfWork;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [InfraModule],
      providers: [
        {
          provide: IUnitOfWork,
          useExisting: UnitOfWork,
        },
        EventService,
        PrismaService,
      ],
    }).compile();
    service = module.get<EventService>(EventService);
    prismaService = module.get<PrismaService>(PrismaService);
    unitofwork = module.get<UnitOfWork>(UnitOfWork);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prismaService).toBeDefined();
  });

  it('should create a new event', async () => {
    const createEventParam: CreateEventParam = {
      name: 'Event Name',
      description: 'Event Description',
      image: 'Event Image',
      startDate: new Date("1/1/2025"),
      endDate: new Date("1/2/2025"),
      turnsPerDay: 1,
      partnerId: 'Partner ID',
    };
    const result = await service.createNewEvent(createEventParam);
    expect(result).toHaveProperty('id');
    const event = await unitofwork.eventRepository.getById(result.id);
    expect(event).toBeDefined();
    await expect(unitofwork.eventRepository.delete(result.id)).resolves.not.toThrow();
  });


  describe('EventService', () => {
    let event: EventAggregate;
    let userId: string;

    beforeAll(async () => {
      const createEventParam: CreateEventParam = {
        name: 'Event Name',
        description: 'Event Description',
        image: 'Event Image',
        startDate: new Date("1/1/2025"),
        endDate: new Date("1/2/2025"),
        turnsPerDay: 1,
        partnerId: 'Partner ID',
      };
      const result = await service.createNewEvent(createEventParam);
      event = await unitofwork.eventRepository.getById(result.id);
      userId = 'User Join ID';
    });

    afterAll(async () => {
      unitofwork.eventRepository.delete(event.id);
    });

    it('should update event info', async () => {
      const updateEventParam: UpdateEventParam = {
        id: event.id,
        name: 'Event Name Updated',
        description: 'Event Description Updated',
      };
      await expect(service.updateEventInfo(updateEventParam)).resolves.not.toThrow();
      const updatedEvent = await unitofwork.eventRepository.getById(event.id);
      expect(updatedEvent.props.name).toBe(updateEventParam.name);
      expect(updatedEvent.props.description).toBe(updateEventParam.description);
      expect(updatedEvent.props.image).toBe(event.props.image);
    });

    it('should validate event approval: APPROVED', async () => {
      const validateEventApprovalParam: ValidateEventApprovalParam = {
        eventId: event.id,
        isApproved: true,
      };
      await expect(service.validateApproval(validateEventApprovalParam)).resolves.not.toThrow();
      const updatedEvent = await unitofwork.eventRepository.getById(event.id);
      expect(updatedEvent.props._eventStatusContext.getState()).toBe(EventStatus.APPROVED);
    });

    it('should validate event approval: REJECTED', async () => {
      const validateEventApprovalParam: ValidateEventApprovalParam = {
        eventId: event.id,
        isApproved: false,
      };
      // Update so it change to PENDING
      await expect(service.updateEventInfo({ id: event.id, name: "Event Updated 2" })).resolves.not.toThrow();
      await expect(service.validateApproval(validateEventApprovalParam)).resolves.not.toThrow();
      const updatedEvent = await unitofwork.eventRepository.getById(event.id);
      expect(updatedEvent.props._eventStatusContext.getState()).toBe(EventStatus.REJECTED);
    });

    it('should join an event', async () => {
      const joinEventParam: JoinEventParam = {
        eventId: event.id,
        userId: userId,
      };
      await expect(service.joinEvent(joinEventParam)).resolves.not.toThrow();
      const updatedEvent = await unitofwork.eventRepository.getById(event.id);
      expect(updatedEvent.props.usersJoin.length).toBe(1);
      expect(updatedEvent.props.usersJoin[0].props.turn).toBe(updatedEvent.props.turnsPerDay);
    });

    it('should leave an event', async () => {
      const leaveEventParam: LeaveEventParam = {
        eventId: event.id,
        userId: userId,
      };
      await expect(service.leaveEvent(leaveEventParam)).resolves.not.toThrow();
      const updatedEvent = await unitofwork.eventRepository.getById(event.id);
      expect(updatedEvent.props.usersJoin.length).toBe(0);
    });

    it('should like an event', async () => {
      const likeEventParam: LikeEventParam = {
        eventId: event.id,
        userId: userId,
      };
      await expect(service.likeEvent(likeEventParam)).resolves.not.toThrow();
      const updatedEvent = await unitofwork.eventRepository.getById(event.id);
      expect(updatedEvent.props.usersLike.length).toBe(1);
    });

    it('should unlike an event', async () => {
      const unlikeEventParam: UnlikeEventParam = {
        eventId: event.id,
        userId: userId,
      };
      await expect(service.unlikeEvent(unlikeEventParam)).resolves.not.toThrow();
      const updatedEvent = await unitofwork.eventRepository.getById(event.id);
      expect(updatedEvent.props.usersLike.length).toBe(0);
    });
  });
});