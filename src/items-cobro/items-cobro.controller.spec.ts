import { Test, TestingModule } from '@nestjs/testing';
import { ItemsCobroController } from './items-cobro.controller';

describe('ItemsCobroController', () => {
  let controller: ItemsCobroController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemsCobroController],
    }).compile();

    controller = module.get<ItemsCobroController>(ItemsCobroController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
