import {
  AuthService,
  SessionsServiceStub,
  UsersServiceStub,
} from 'src/users/services';
import { AuthController } from './auth.controller';
import { Test } from '@nestjs/testing';
import {
  SESSIONS_SERVICE_PROVIDER,
  USERS_SERVICE_PROVIDER,
} from 'src/users/typing';

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: SESSIONS_SERVICE_PROVIDER,
          useClass: SessionsServiceStub,
        },
        {
          provide: USERS_SERVICE_PROVIDER,
          useClass: UsersServiceStub,
        },
      ],
    }).compile();

    authController = moduleRef.get(AuthController);
  });

  describe('sign-up', () => {
    it('should return token pair', async () => {
      const tokenPair = await authController.signUp({
        email: 'test@test.email',
        password: 'password',
        name: 'name',
      });

      expect(tokenPair).toBeTruthy();
      expect(tokenPair.accessToken).toBeTruthy();
      expect(tokenPair.refreshToken).toBeTruthy();
    });
  });
});
