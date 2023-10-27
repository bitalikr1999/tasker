import { Inject, Injectable } from '@nestjs/common';
import { GenerateJwtToken, TokenPayload } from 'src/users/domain/jwt';
import { ISessionsTokensService, IUsersModuleParams } from 'src/users/typing';
import { USERS_MODULE_OPTION } from 'src/users/typing/consts';

@Injectable()
export class SessionsJWTTokensService implements ISessionsTokensService {
  constructor(
    @Inject(USERS_MODULE_OPTION)
    private readonly moduleOptions: IUsersModuleParams,
  ) {}

  public generateAccessToken(userId: string, role?: string) {
    const tokenPayload = TokenPayload.createFromPayload(
      this.moduleOptions.tokenPaylodSalt,
      userId,
      role,
    );
    const jwtToken = new GenerateJwtToken()
      .setPayload(tokenPayload)
      .setSalt(this.moduleOptions.jwtParams.salt)
      .setExpiresIn('360s')
      .createToken();
    return jwtToken;
  }

  public generateRefreshToken(userId: string) {
    const tokenPayload = TokenPayload.createFromPayload(
      this.moduleOptions.tokenPaylodSalt,
      userId,
    );

    const jwtToken = new GenerateJwtToken()
      .setPayload(tokenPayload)
      .setSalt(this.moduleOptions.jwtParams.salt)
      .createToken();
    return jwtToken;
  }
}
