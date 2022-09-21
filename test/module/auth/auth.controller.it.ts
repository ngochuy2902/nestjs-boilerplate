import { closeTestApp, initializeTestApp } from '@test-setup/setup';
import { DataSource } from 'typeorm';
import { TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ApplicationConfig } from '@config/application.config';
import request from 'supertest';
import { UserRepository } from '@module/user/user.repository';
import { UserRoleRepository } from '@module/user-role/user-role.repository';
import { EncryptionUtil } from '@util/encryption.util';
import { UnauthorizedException } from '@exception/unauthorized.exception';
import { ErrorCode } from '@share/constant/error-code';
import { User } from '@entity/user.entity';
import { DatabaseUtil } from '@test-util/database.util';
import { UserBlueprint } from '@test-blueprint/user/user.blueprint';
import { UserRole } from '@entity/user-role.entity';
import { RoleEnum } from '@share/enum/role.enum';

describe('AuthController Integration Test', () => {
  const baseUrl = ApplicationConfig.baseUrl;

  let app: INestApplication;
  let moduleFixture: TestingModule;
  let httpServer: any;
  let dataSource: DataSource;
  let userRepository: UserRepository;
  let userRoleRepository: UserRoleRepository;

  let user: User;
  const userPassword = 'password';

  beforeAll(async () => {
    const testApp = await initializeTestApp();
    app = testApp.appInstance;
    moduleFixture = testApp.moduleFixture;
    httpServer = app.getHttpServer();
    dataSource = testApp.testDataSource;

    userRepository = moduleFixture.get<UserRepository>(UserRepository);
    userRoleRepository = moduleFixture.get<UserRoleRepository>(UserRoleRepository);
  }, 180000);

  beforeEach(async () => {
    await DatabaseUtil.clearData(dataSource, UserRole);
    await DatabaseUtil.clearData(dataSource, User);
    await initData();
  });

  afterAll(async () => {
    await closeTestApp();
  });

  it('test_login_shouldBeOk', async () => {
    const res = await request(httpServer)
      .post(`${baseUrl}/auth/login`)
      .send({
        username: user.username,
        password: userPassword,
      })
      .expect(200);

    const { body } = res;
    expect(body).toHaveProperty('accessToken');
    expect(body).toHaveProperty('refreshToken');
  });

  it('test_login_withWrongUsername_shouldThrowUnauthorizedException', async () => {
    const res = await request(httpServer)
      .post(`${baseUrl}/auth/login`)
      .send({
        username: 'wrong-username',
        password: userPassword,
      })
      .expect(401);
    const { body } = res;
    const { name, errorCode } = body;
    expect(name).toEqual(UnauthorizedException.name);
    expect(errorCode).toEqual(ErrorCode.UNAUTHORIZED);
  });

  it('test_login_withWrongPassword_shouldThrowUnauthorizedException', async () => {
    const res = await request(httpServer)
      .post(`${baseUrl}/auth/login`)
      .send({
        username: user.username,
        password: 'wrong-password',
      })
      .expect(401);
    const { body } = res;
    const { name, errorCode } = body;
    expect(name).toEqual(UnauthorizedException.name);
    expect(errorCode).toEqual(ErrorCode.UNAUTHORIZED);
  });

  it('test_refreshToken_shouldBeOk', async () => {
    const loginRes = await request(httpServer).post(`${baseUrl}/auth/login`).send({
      username: user.username,
      password: userPassword,
    });
    const { refreshToken } = loginRes.body;
    const res = await request(httpServer)
      .post(`${baseUrl}/auth/refresh-token`)
      .send({ refreshToken })
      .expect(200);
    const { body } = res;
    expect(body).toHaveProperty('accessToken');
    expect(body).toHaveProperty('refreshToken');
    expect(body.roles).toEqual([RoleEnum.SUPER_ADMIN]);
  });

  it('test_refreshToken_withWrongRefreshToken_shouldThrowValidatorException', async () => {
    const res = await request(httpServer)
      .post(`${baseUrl}/auth/refresh-token`)
      .send({ refreshToken: 'wrong-refresh-token' })
      .expect(400);
    const { body } = res;
    const { name, errorCode } = body;
    expect(name).toEqual('ValidatorException');
    expect(errorCode).toEqual(ErrorCode.INVALID_REFRESH_TOKEN);
  });

  async function initData() {
    user = UserBlueprint.create({ password: await EncryptionUtil.generateHash('password') });
    await userRepository.save(user);

    await userRoleRepository.save({
      userId: user.id,
      roleId: 1,
      createdBy: 1,
    });
  }
});
