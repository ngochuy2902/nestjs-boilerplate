import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { closeTestApp, initializeTestApp } from '../setup/setup';
import { ApplicationConfig } from '@config/application.config';

describe('AppController Integration Test', () => {
  const baseUrl = ApplicationConfig.baseUrl;
  let app: INestApplication;
  let httpServer: any;

  beforeAll(async () => {
    const testApp = await initializeTestApp();
    app = testApp.appInstance;
    httpServer = app.getHttpServer();
  }, 180000);

  afterAll(async () => {
    await closeTestApp();
  });

  it('Check server status', async () => {
    const res = request(httpServer).get(baseUrl);
    return res.expect(200).expect('Hello World!');
  });
});
