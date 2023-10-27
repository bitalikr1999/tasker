import * as aes256 from 'aes256';
import { ITokenPayload } from '../interfaces';

export class TokenPayload implements ITokenPayload {
  private userId: string;
  private role?: string;
  private hashedPayload: string;
  private salt: string;

  static createFromPayload(salt: string, userId: string, role?: string) {
    return new TokenPayload()
      .setSalt(salt)
      .setUserId(userId)
      .setRole(role)
      .hashData();
  }

  static createFromHash(salt: string, hashedPayload: string) {
    return new TokenPayload()
      .setSalt(salt)
      .setHashedPayload(hashedPayload)
      .unhashData();
  }

  public setUserId(userId: string) {
    this.userId = userId;
    return this;
  }

  public setRole(role: string) {
    this.role = role;
    return this;
  }

  public setSalt(salt: string) {
    this.salt = salt;
    return this;
  }

  public setHashedPayload(hash: string) {
    this.hashedPayload = hash;
    return this;
  }

  public hashData() {
    this.hashedPayload = aes256.encrypt(
      this.salt,
      JSON.stringify({
        id: this.userId,
        role: this.role,
      }),
    );
    return this;
  }

  public unhashData() {
    const decrypted = JSON.parse(aes256.decrypt(this.salt, this.hashedPayload));
    this.setUserId(decrypted.id);
    if (decrypted.role) this.setRole(decrypted.role);
    return this;
  }

  public getHashedDataString(): string {
    return this.hashedPayload;
  }

  public getRole(): string {
    return this.role;
  }
  public getUserId(): string {
    return this.userId;
  }
}
