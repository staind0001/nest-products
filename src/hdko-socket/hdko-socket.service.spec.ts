import { Test, TestingModule } from '@nestjs/testing';
import { HdkoSocketService } from './hdko-socket.service';

describe('HdkoSocketService', () => {
  let service: HdkoSocketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HdkoSocketService],
    }).compile();

    service = module.get<HdkoSocketService>(HdkoSocketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
