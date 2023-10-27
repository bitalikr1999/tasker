import { ICreateUserPayload, IUser, IUsersService } from 'src/users/typing';

export class UsersServiceStub implements IUsersService {
  public async create(payload: ICreateUserPayload): Promise<IUser> {
    return {
      id: '0000',
      ...payload,
    };
  }
}
