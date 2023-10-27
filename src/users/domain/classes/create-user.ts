import { ICreateUser, ICreateUserResultData } from '../interfaces';
import { nanoid } from 'nanoid';
import { CreateHashedPassword } from './create-hashed-password';

export class CreateUser {
  static async createData(data: ICreateUser): Promise<ICreateUserResultData> {
    const createPassword = new CreateHashedPassword(data.password);
    const hashedPassword = await createPassword.getHashedPassword();

    return {
      id: this.generateId(),
      name: data.name,
      email: data.email,
      password: hashedPassword.getHashedPassword(),
      passwordSalt: hashedPassword.getSalt(),
    };
  }
  static generateId() {
    return nanoid();
  }
}
