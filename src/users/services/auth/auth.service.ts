import { Inject, Injectable } from '@nestjs/common';

import { plainToInstance } from 'class-transformer';
import {
  ISessionsService,
  IUsersService,
  SESSIONS_SERVICE_PROVIDER,
  USERS_SERVICE_PROVIDER,
} from 'src/users/typing';
import { SignUpPayloadDto, TokenPairDto } from 'src/users/dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USERS_SERVICE_PROVIDER)
    private readonly usersService: IUsersService,

    @Inject(SESSIONS_SERVICE_PROVIDER)
    private readonly sessionsService: ISessionsService,
  ) {}

  public async signUp(payload: SignUpPayloadDto): Promise<TokenPairDto> {
    const user = await this.usersService.create(payload);
    const session = await this.sessionsService.startSession({
      userId: user.id,
    });
    return plainToInstance(TokenPairDto, session, {
      excludeExtraneousValues: true,
    });
  }
}
