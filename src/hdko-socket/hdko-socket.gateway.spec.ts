import { Test, TestingModule } from '@nestjs/testing';
import { HdkoSocketGateway } from './hdko-socket.gateway';
import { HdkoSocketService } from './hdko-socket.service';

describe('HdkoSocketGateway', () => {
  let gateway: HdkoSocketGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HdkoSocketGateway, HdkoSocketService],
    }).compile();

    gateway = module.get<HdkoSocketGateway>(HdkoSocketGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
