import { Test, TestingModule } from '@nestjs/testing';
import { CronEventService } from './cron.event.service';

describe('CronEventService', () => {
  let service: CronEventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CronEventService],
    }).compile();

    service = module.get<CronEventService>(CronEventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
