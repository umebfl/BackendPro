import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createTestApp, closeTestApp } from '../../setup/base-e2e';

describe('Core Module (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await closeTestApp(app);
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
});
