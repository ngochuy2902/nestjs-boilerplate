import { ForbiddenException, INestApplication, NotFoundException } from '@nestjs/common';
import { closeTestApp, initializeTestApp } from '@test-setup/setup';
import request from 'supertest';
import { TestingModule } from '@nestjs/testing';
import { TokenProvider } from '@security/token-provider/token-provider';
import { UserCreateReqDto } from '@module/user/dto/req/user-create-req.dto';
import { UserRepository } from '@module/user/user.repository';
import { DataSource } from 'typeorm';
import { ApplicationConfig } from '@config/application.config';
import { ErrorCode } from '@share/constant/error-code';
import { UserAlreadyExistException } from '@exception/user-already-exist.exception';
import { UnauthorizedException } from '@exception/unauthorized.exception';
import { EncryptionUtil } from '@util/encryption.util';
import { ValidatorException } from '@exception/validator.exception';
import { UserBlueprint } from '@test-blueprint/user/user.blueprint';
import { User } from '@entity/user.entity';
import { DatabaseUtil } from '@test-util/database.util';
import { RequestUtil } from '@test-util/request.util';

describe('UserController Integration Test', () => {
  const baseUrl = ApplicationConfig.baseUrl;
  const authHeader = ApplicationConfig.auth.authHeader;

  let app: INestApplication;
  let moduleFixture: TestingModule;
  let httpServer: any;
  let tokenProvider: TokenProvider;
  let userRepository: UserRepository;
  let dataSource: DataSource;
  let adminAccessToken: string;
  let userAccessToken: string;
  let admin: User;
  let user: User;

  beforeAll(async () => {
    const testApp = await initializeTestApp();
    app = testApp.appInstance;
    moduleFixture = testApp.moduleFixture;
    httpServer = app.getHttpServer();
    dataSource = testApp.testDataSource;
    tokenProvider = moduleFixture.get<TokenProvider>(TokenProvider);
    userRepository = moduleFixture.get<UserRepository>(UserRepository);

    adminAccessToken = tokenProvider.generateToken(1, ['ADMIN']).accessToken;
    userAccessToken = tokenProvider.generateToken(2, ['USER']).accessToken;
  }, 180000);

  beforeEach(async () => {
    await DatabaseUtil.clearData(dataSource, User);
    await initData();
  });

  afterAll(async () => {
    await closeTestApp();
  });

  it('test_createUser_shouldBeOk', async () => {
    await request(httpServer)
      .post(`${baseUrl}/users`)
      .set(authHeader, adminAccessToken)
      .send({
        email: 'email@email.com',
        password: 'password',
        name: 'name',
        roles: ['USER'],
      } as UserCreateReqDto)
      .expect(201)
      .expect('3');
    const newUser = await userRepository.findOneBy({ email: 'email@email.com' });
    expect(newUser).toBeDefined();
    expect(newUser?.name).toEqual('name');
  });

  it('test_createUser_withoutAuthHeader_shouldBeThrowUnauthorizedException', async () => {
    const res = await request(httpServer)
      .post(`${baseUrl}/users`)
      .send({
        email: 'email@email.com',
        password: 'password',
        name: 'name',
        roles: ['USER'],
      } as UserCreateReqDto)
      .expect(401);

    const body = res.body;
    expect(body.name).toEqual(UnauthorizedException.name);
    expect(body.errorCode).toEqual(ErrorCode.UNAUTHORIZED);
  });

  it('test_createUser_withUserAuthToken_shouldBeThrowForbiddenException', async () => {
    const res = await request(httpServer)
      .post(`${baseUrl}/users`)
      .set(authHeader, userAccessToken)
      .send({
        email: 'email@email.com',
        password: 'password',
        name: 'name',
        roles: ['USER'],
      } as UserCreateReqDto)
      .expect(403);
    const body = res.body;
    expect(body.name).toEqual(ForbiddenException.name);
    expect(body.errorCode).toEqual(ErrorCode.FORBIDDEN);
  });

  it('test_createUser_withExistedEmail_shouldBeThrowAlreadyExistException', async () => {
    const res = await request(httpServer)
      .post(`${baseUrl}/users`)
      .set(authHeader, adminAccessToken)
      .send({
        email: user.email,
        password: 'password',
        name: 'User',
        roles: ['USER'],
      } as UserCreateReqDto)
      .expect(400);
    const body = res.body;
    expect(body.name).toEqual(UserAlreadyExistException.name);
    expect(body.errorCode).toEqual(ErrorCode.USER_ALREADY_EXIST);
  });

  it('test_searchUsers_shouldBeOk', async () => {
    const res = await request(httpServer)
      .get(`${baseUrl}/users`)
      .set(authHeader, adminAccessToken)
      .expect(200);
    const records = res.body.records;
    expect(records.length).toEqual(2);
    expect(records[0].name).toEqual(admin.name);
    expect(records[1].name).toEqual(user.name);
  });

  it('test_searchUsers_withPagination_shouldBeOk', async () => {
    const res = await request(httpServer)
      .get(`${baseUrl}/users?${RequestUtil.generateQuery({ page: 1, pageSize: 1 })}`)
      .set(authHeader, adminAccessToken)
      .expect(200);
    const records = res.body.records;
    expect(records.length).toEqual(1);
    expect(records[0].name).toEqual(admin.name);
  });

  it('test_searchUsers_withKeywordByName_shouldBeOk', async () => {
    const res = await request(httpServer)
      .get(`${baseUrl}/users?${RequestUtil.generateQuery({ keyword: user.name })}`)
      .set(authHeader, adminAccessToken)
      .expect(200);
    const records = res.body.records;
    expect(records.length).toEqual(1);
    expect(records[0].name).toEqual(user.name);
  });

  it('test_getCurrentUserProfile_shouldBeOk', async () => {
    const res = await request(httpServer)
      .get(`${baseUrl}/users/me`)
      .set(authHeader, userAccessToken)
      .expect(200);
    expect(res.body.name).toEqual(user.name);
  });

  it('test_getUserById_shouldBeOk', async () => {
    const res = await request(httpServer)
      .get(`${baseUrl}/users/2`)
      .set(authHeader, adminAccessToken)
      .expect(200);
    expect(res.body.email).toEqual(user.email);
    expect(res.body.name).toEqual(user.name);
  });

  it('test_getUserById_withNotFoundUser_shouldBeThrowNotFoundException', async () => {
    const res = await request(httpServer)
      .get(`${baseUrl}/users/3`)
      .set(authHeader, adminAccessToken)
      .expect(404);
    const body = res.body;
    expect(body.name).toEqual(NotFoundException.name);
    expect(body.errorCode).toEqual(ErrorCode.NOT_FOUND);
  });

  it('test_changePassword_shouldBeOk', async () => {
    await request(httpServer)
      .put(`${baseUrl}/users/change-password`)
      .set(authHeader, userAccessToken)
      .send({
        currentPassword: 'password',
        newPassword: 'newPassword',
      })
      .expect(204);
  });

  it('test_changePassword_withWrongCurrentPassword_shouldBeThrowValidatorException', async () => {
    const res = await request(httpServer)
      .put(`${baseUrl}/users/change-password`)
      .set(authHeader, userAccessToken)
      .send({
        currentPassword: 'wrongPassword',
        newPassword: 'newPassword',
      })
      .expect(400);
    const body = res.body;
    expect(body.name).toEqual(ValidatorException.name);
    expect(body.errorCode).toEqual(ErrorCode.WRONG_PASSWORD);
  });

  async function initData() {
    admin = UserBlueprint.create({ password: await EncryptionUtil.generateHash('password') });
    user = UserBlueprint.create({ password: await EncryptionUtil.generateHash('password') });

    await userRepository.save([admin, user]);
  }
});
