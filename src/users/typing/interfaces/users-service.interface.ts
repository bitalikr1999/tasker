import { IUser } from './user.interface';

export interface IUsersService {
  create(payload: ICreateUserPayload): Promise<IUser>;
}

export interface ICreateUserPayload {
  email: string;
  name: string;
  password: string;
}
