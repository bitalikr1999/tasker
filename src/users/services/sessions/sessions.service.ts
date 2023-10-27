import { Inject, Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { PrismaService } from 'src/prisma/prisma.service';
import { CustomException } from 'src/shared/exeptions';
import {
  ISession,
  ISessionsService,
  ISessionsTokensService,
  IStartSessionsPayload,
} from 'src/users/typing';
import { SESSIONS_TOKENS_SERVICE } from 'src/users/typing/consts/services';

@Injectable()
export class SessionsService implements ISessionsService {
  constructor(
    @Inject(SESSIONS_TOKENS_SERVICE)
    private readonly sessionsTokensService: ISessionsTokensService,

    private readonly prismaService: PrismaService,
  ) {}

  public async startSession(payload: IStartSessionsPayload): Promise<ISession> {
    const accessToken = this.sessionsTokensService.generateAccessToken(
      payload.userId,
      payload.role,
    );
    const refreshToken = this.sessionsTokensService.generateRefreshToken(
      payload.userId,
    );

    const session = await this.prismaService.session.create({
      data: {
        accessToken,
        refreshToken,
        userId: payload.userId,
        id: nanoid(),
      },
    });

    return session;
  }

  public async endSessions(sessionId: string): Promise<void> {
    const session = await this.prismaService.session.findFirst({
      where: { id: sessionId },
    });
    if (!session) throw new CustomException({ key: 'sessionNotFound' });

    await this.prismaService.session.delete({ where: { id: sessionId } });
  }
}
