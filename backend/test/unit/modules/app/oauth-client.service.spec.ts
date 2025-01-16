import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { OAuthClientService } from '@/modules/app/oauth-client.service';
import {
  OAuthClient,
  OAuthClientDocument,
} from '@/modules/app/oauth-client.entity';
import { Model } from 'mongoose';

describe('OAuthClientService', () => {
  let service: OAuthClientService;
  let model: Model<OAuthClientDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OAuthClientService,
        {
          provide: getModelToken(OAuthClient.name),
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            findById: jest.fn(),
            findOne: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            deleteOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<OAuthClientService>(OAuthClientService);
    model = module.get<Model<OAuthClientDocument>>(
      getModelToken(OAuthClient.name),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new client', async () => {
      const createDto = {
        name: 'Test Client',
        appId: 'test-app-id',
        secret: 'test-secret',
        department: 'Test Department',
        ownerId: 'test-owner-id',
      };

      jest.spyOn(model, 'create').mockResolvedValue(createDto as any);

      const result = await service.create(createDto);
      expect(result).toEqual(createDto);
      expect(model.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('findAll', () => {
    it('should return all clients', async () => {
      const clients = [{ name: 'Client 1' }, { name: 'Client 2' }];
      jest.spyOn(model, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValue(clients),
      } as any);

      const result = await service.findAll();
      expect(result).toEqual(clients);
      expect(model.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a client by id', async () => {
      const client = { name: 'Test Client' };
      jest.spyOn(model, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValue(client),
      } as any);

      const result = await service.findOne('test-id');
      expect(result).toEqual(client);
      expect(model.findById).toHaveBeenCalledWith('test-id');
    });

    it('should throw NotFoundException if client not found', async () => {
      jest.spyOn(model, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      } as any);

      await expect(service.findOne('test-id')).rejects.toThrow();
    });
  });

  describe('findByAppId', () => {
    it('should return a client by appId', async () => {
      const client = { name: 'Test Client' };
      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue(client),
      } as any);

      const result = await service.findByAppId('test-app-id');
      expect(result).toEqual(client);
      expect(model.findOne).toHaveBeenCalledWith({ appId: 'test-app-id' });
    });

    it('should throw NotFoundException if client not found', async () => {
      jest.spyOn(model, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      } as any);

      await expect(service.findByAppId('test-app-id')).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('should update a client', async () => {
      const updateDto = { name: 'Updated Client' };
      const updatedClient = { name: 'Updated Client' };
      jest.spyOn(model, 'findByIdAndUpdate').mockReturnValue({
        exec: jest.fn().mockResolvedValue(updatedClient),
      } as any);

      const result = await service.update('test-id', updateDto);
      expect(result).toEqual(updatedClient);
      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
        'test-id',
        updateDto,
        { new: true },
      );
    });

    it('should throw NotFoundException if client not found', async () => {
      jest.spyOn(model, 'findByIdAndUpdate').mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      } as any);

      await expect(service.update('test-id', {})).rejects.toThrow();
    });
  });

  describe('remove', () => {
    it('should delete a client', async () => {
      jest.spyOn(model, 'deleteOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue({ deletedCount: 1 }),
      } as any);

      await service.remove('test-id');
      expect(model.deleteOne).toHaveBeenCalledWith({ _id: 'test-id' });
    });

    it('should throw NotFoundException if client not found', async () => {
      jest.spyOn(model, 'deleteOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue({ deletedCount: 0 }),
      } as any);

      await expect(service.remove('test-id')).rejects.toThrow();
    });
  });
});
