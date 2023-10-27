import {
  ISession,
  ISessionsService,
  IStartSessionsPayload,
} from 'src/users/typing';

export class SessionsServiceStub implements ISessionsService {
  public async startSession(payload: IStartSessionsPayload): Promise<ISession> {
    return {
      id: '000',
      userId: payload.userId,
      accessToken: '0000000000000000000000',
      refreshToken: '0000000000000000000001',
    };
  }

  public async endSessions(): Promise<void> {
    return;
  }
}
