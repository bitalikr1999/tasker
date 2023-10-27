import { nanoid } from 'nanoid';
import * as bcrypt from 'bcryptjs';
import { HashedPassword } from './hashed-password';

export class CreateHashedPassword {
  static minSaltRoundsValidateError = 'Rounds should be more 0';
  static maxSaltRoundValidateError = 'Rounds should be less 50';

  private passwordSalt: string;
  private saltRounds = 10;
  private hashedPassword: string;

  constructor(private password: string) {
    this.generatePasswordSalt();
  }

  private generatePasswordSalt() {
    this.passwordSalt = nanoid();
  }

  public getPasswordSalt() {
    return this.passwordSalt;
  }

  private async generateHashedPassword() {
    this.hashedPassword = await bcrypt.hash(
      this.getPasswordSalt() + this.password,
      this.saltRounds,
    );
  }

  public setSaltRounds(val: number) {
    if (val < 1)
      throw new Error(CreateHashedPassword.minSaltRoundsValidateError);
    if (val > 50)
      throw new Error(CreateHashedPassword.maxSaltRoundValidateError);

    this.saltRounds = val;
  }

  public async getHashedPassword() {
    if (!this.password) throw new Error('Password should not be null');

    await this.generateHashedPassword();

    return new HashedPassword(this.passwordSalt, this.hashedPassword);
  }
}
