import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import {
  UsersService,
  AuthService,
  SessionsJWTTokensService,
  SessionsService,
} from './services';
import {
  IUsersModuleParams,
  USERS_MODULE_OPTION,
  SESSIONS_TOKENS_SERVICE,
  SESSIONS_SERVICE_PROVIDER,
  USERS_SERVICE_PROVIDER,
} from './typing';
import { AuthController } from './controllers/auth';

const provideParams = {
  jwtParams: {
    salt: 'somejwtsalt',
  },
  tokenPaylodSalt: 'tokenpasad',
} as IUsersModuleParams;

@Module({
  providers: [
    AuthService,
    {
      provide: USERS_MODULE_OPTION,
      useValue: provideParams,
    },
    {
      provide: SESSIONS_TOKENS_SERVICE,
      useClass: SessionsJWTTokensService,
    },
    {
      provide: SESSIONS_SERVICE_PROVIDER,
      useClass: SessionsService,
    },
    {
      provide: USERS_SERVICE_PROVIDER,
      useClass: UsersService,
    },
  ],
  imports: [PrismaModule],
  controllers: [AuthController],
})
export class UsersModule {}
