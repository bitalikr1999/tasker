export interface ICreateUser {
  password: string;
  name: string;
  email: string;
}

export interface ICreateUserResultData {
  password: string;
  name: string;
  email: string;
  passwordSalt: string;
  id: string;
}
