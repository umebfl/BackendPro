import { Test, TestingModule } from '@nestjs/testing';
import { SwaggerConfigModule } from '@/utils/swagger/swagger.module';
import { NestApplication } from '@nestjs/core';

describe('SwaggerConfigModule', () => {
  let app: NestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SwaggerConfigModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should setup swagger documentation', () => {
    expect(() => SwaggerConfigModule.setup(app)).not.toThrow();
  });
});
