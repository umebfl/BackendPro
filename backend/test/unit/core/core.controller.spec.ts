import { Test, TestingModule } from '@nestjs/testing';
import { CoreController } from '../../../src/core/core.controller';
import { CoreService } from '../../../src/core/core.service';
import { setupSwagger } from '../../setup/setup';

describe('CoreController', () => {
  let coreController: CoreController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CoreController],
      providers: [CoreService],
    }).compile();

    await setupSwagger(app.createNestApplication());

    coreController = app.get<CoreController>(CoreController);
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      expect(coreController.getHello()).toBe('Hello World!');
    });
  });
});
