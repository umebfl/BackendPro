import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/app.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OAuthClient } from '@/modules/app/oauth-client.entity';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

describe('OAuthClientController (e2e)', () => {
  let app: INestApplication;
  let oauthClientModel: Model<OAuthClient>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/ai-test'),
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    oauthClientModel = moduleFixture.get<Model<OAuthClient>>(
      getModelToken(OAuthClient.name),
    );
    await oauthClientModel.deleteMany({});
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/oauth-clients (POST)', () => {
    it('should create a new client', async () => {
      const createDto = {
        name: 'Test Client',
        appId: 'test-app-id',
        secret: 'test-secret',
        department: 'Test Department',
        ownerId: 'test-owner-id',
      };

      const response = await request(app.getHttpServer())
        .post('/oauth-clients')
        .send(createDto)
        .expect(201);

      expect(response.body).toMatchObject(createDto);
    });
  });

  describe('/oauth-clients (GET)', () => {
    it('should return all clients', async () => {
      await oauthClientModel.create({
        name: 'Client 1',
        appId: 'client-1',
        secret: 'secret-1',
        department: 'Dept 1',
        ownerId: 'owner-1',
      });

      const response = await request(app.getHttpServer())
        .get('/oauth-clients')
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('/oauth-clients/:id (GET)', () => {
    it('should return a client by id', async () => {
      const client = await oauthClientModel.create({
        name: 'Test Client',
        appId: 'test-app-id',
        secret: 'test-secret',
        department: 'Test Department',
        ownerId: 'test-owner-id',
      });

      const response = await request(app.getHttpServer())
        .get(`/oauth-clients/${client._id}`)
        .expect(200);

      expect(response.body).toMatchObject({
        name: 'Test Client',
        appId: 'test-app-id',
      });
    });

    it('should return 404 for non-existent client', async () => {
      await request(app.getHttpServer())
        .get('/oauth-clients/507f1f77bcf86cd799439011')
        .expect(404);
    });
  });

  describe('/oauth-clients/by-app-id/:appId (GET)', () => {
    it('should return a client by appId', async () => {
      await oauthClientModel.create({
        name: 'Test Client',
        appId: 'test-app-id',
        secret: 'test-secret',
        department: 'Test Department',
        ownerId: 'test-owner-id',
      });

      const response = await request(app.getHttpServer())
        .get('/oauth-clients/by-app-id/test-app-id')
        .expect(200);

      expect(response.body).toMatchObject({
        appId: 'test-app-id',
      });
    });

    it('should return 404 for non-existent appId', async () => {
      await request(app.getHttpServer())
        .get('/oauth-clients/by-app-id/non-existent-app-id')
        .expect(404);
    });
  });

  describe('/oauth-clients/:id (PUT)', () => {
    it('should update a client', async () => {
      const client = await oauthClientModel.create({
        name: 'Test Client',
        appId: 'test-app-id',
        secret: 'test-secret',
        department: 'Test Department',
        ownerId: 'test-owner-id',
      });

      const updateDto = { name: 'Updated Client' };

      const response = await request(app.getHttpServer())
        .put(`/oauth-clients/${client._id}`)
        .send(updateDto)
        .expect(200);

      expect(response.body).toMatchObject(updateDto);
    });

    it('should return 404 for non-existent client', async () => {
      await request(app.getHttpServer())
        .put('/oauth-clients/507f1f77bcf86cd799439011')
        .send({ name: 'Updated Client' })
        .expect(404);
    });
  });

  describe('/oauth-clients/:id (DELETE)', () => {
    it('should delete a client', async () => {
      const client = await oauthClientModel.create({
        name: 'Test Client',
        appId: 'test-app-id',
        secret: 'test-secret',
        department: 'Test Department',
        ownerId: 'test-owner-id',
      });

      await request(app.getHttpServer())
        .delete(`/oauth-clients/${client._id}`)
        .expect(200);

      const deletedClient = await oauthClientModel.findById(client._id).exec();
      expect(deletedClient).toBeNull();
    });

    it('should return 404 for non-existent client', async () => {
      await request(app.getHttpServer())
        .delete('/oauth-clients/507f1f77bcf86cd799439011')
        .expect(404);
    });
  });
});
