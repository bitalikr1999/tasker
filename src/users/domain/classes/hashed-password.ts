import * as bcrypt from 'bcryptjs';

export class HashedPassword {
  constructor(
    private readonly salt: string,
    private readonly hashedPassword: string,
  ) {}

  public getSalt() {
    return this.salt;
  }

  public getHashedPassword() {
    return this.hashedPassword;
  }

  public async compareWithPassword(password: string) {
    return bcrypt.compare(this.salt + password, this.hashedPassword);
  }
}
