export interface ISessionsTokensService {
  generateAccessToken(userId: string, role?: string): string;
  generateRefreshToken(userId: string): string;
}
