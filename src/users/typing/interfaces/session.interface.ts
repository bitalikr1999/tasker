export interface ISession {
  id?: string;
  userId: string;
  accessToken: string;
  refreshToken: string;
  deviceName?: string;
  createdAt?: Date;
  metadata?: any;
}
