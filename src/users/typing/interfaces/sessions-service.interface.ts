import { ISession } from './session.interface';

export interface ISessionsService {
  startSession(payload: IStartSessionsPayload): Promise<ISession>;
  endSessions(sessionId: string): Promise<void>;
}

export interface IStartSessionsPayload {
  userId: string;
  role?: string;
}
