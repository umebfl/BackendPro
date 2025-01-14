import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createTestApp, closeTestApp } from '../../setup/base-e2e';

describe('Error Handling (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await closeTestApp(app);
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
