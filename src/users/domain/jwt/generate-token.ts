import { ITokenPayload } from '../interfaces';
import * as jwt from 'jsonwebtoken';

export class GenerateJwtToken {
  private salt: string;
  private payload: ITokenPayload;
  private expiresIn?: string;

  public setSalt(salt) {
    this.salt = salt;
    return this;
  }

  public setPayload(payload: ITokenPayload) {
    this.validateTokenPayload(payload);
    this.payload = payload;
    return this;
  }

  public setExpiresIn(expiresIn?: string) {
    this.expiresIn = expiresIn;
    return this;
  }

  public createToken(): string {
    this.checkCanCreateToken();

    const payload = this.payload.getHashedDataString();
    const options = this.getJwtSignOptions();
    return jwt.sign({ sub: payload }, this.salt, options);
  }

  private getJwtSignOptions() {
    if (this.expiresIn) return { expiresIn: this.expiresIn };
    return {};
  }

  private checkCanCreateToken() {
    if (!this.payload) throw new Error('Need to provide ITokenPayload');
    if (!this.salt) throw new Error('Need to provide salt');
  }

  private validateTokenPayload(payload: ITokenPayload) {
    if (typeof payload.getHashedDataString !== 'function')
      throw new Error('TokenPayload should have function getHashedDataString');
  }
}
