import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /hello', () => {
    it('should return hello message', () => {
      return request(app.getHttpServer())
        .get('/hello')
        .expect(200)
        .expect('Hello World!');
    });
  });

  describe('GET /', () => {
    it('should return welcome message', () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect('Welcome to the API');
    });
  });

  describe('Invalid routes', () => {
    it('should return 404 for unknown routes', () => {
      return request(app.getHttpServer()).get('/invalid-route').expect(404);
    });

    it('should return 404 for POST to /hello', () => {
      return request(app.getHttpServer()).post('/hello').expect(404);
    });
  });
});
