export interface ITokenPayload {
  getUserId(): string;
  getRole(): string;
  getHashedDataString(): string;
}
