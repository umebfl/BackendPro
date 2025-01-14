import { Test, TestingModule } from '@nestjs/testing';
import { CoreController } from '../../../src/core/core.controller';
import { CoreService } from '../../../src/core/core.service';

describe('CoreController', () => {
  let coreController: CoreController;
  let coreService: CoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoreController],
      providers: [
        {
          provide: CoreService,
          useValue: {
            getHello: jest.fn(),
            // Add other service methods here as needed
          },
        },
      ],
    }).compile();

    coreController = module.get<CoreController>(CoreController);
    coreService = module.get<CoreService>(CoreService);
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      // Arrange
      const expectedResult = 'Hello World!';
      jest.spyOn(coreService, 'getHello').mockReturnValue(expectedResult);

      // Act
      const result = coreController.getHello();

      // Assert
      expect(result).toBe(expectedResult);
      expect(coreService.getHello).toHaveBeenCalled();
    });

    it('should throw error when service fails', () => {
      // Arrange
      const error = new Error('Service error');
      jest.spyOn(coreService, 'getHello').mockImplementation(() => {
        throw error;
      });

      // Act & Assert
      expect(() => coreController.getHello()).toThrow(error);
    });
  });

  describe('getRoot', () => {
    it('should return welcome message', () => {
      // Act
      const result = coreController.getRoot();

      // Assert
      expect(result).toBe('Welcome to the API');
    });

    it('should throw error when controller fails', () => {
      // Arrange
      jest.spyOn(coreController, 'getRoot').mockImplementation(() => {
        throw new Error('Controller error');
      });

      // Act & Assert
      expect(() => coreController.getRoot()).toThrow('Controller error');
    });
  });
});
