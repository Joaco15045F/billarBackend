import { Test, TestingModule } from '@nestjs/testing';
import { ItemsCobroService } from './items-cobro.service';

describe('ItemsCobroService', () => {
  let service: ItemsCobroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemsCobroService],
    }).compile();

    service = module.get<ItemsCobroService>(ItemsCobroService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
