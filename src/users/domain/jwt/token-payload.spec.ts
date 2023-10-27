import { TokenPayload } from './token-payload';

const salt = '000';
const userId = '0000';

describe('TokenPayload', () => {
  it('create from payload without role', () => {
    const tokenPayload = TokenPayload.createFromPayload(salt, userId);

    expect(tokenPayload).toBeInstanceOf(TokenPayload);
    expect(tokenPayload.getHashedDataString()).toBeTruthy();
    expect(tokenPayload.getUserId()).toEqual(userId);
  });

  it('create from hashed string', () => {
    const hashedString = TokenPayload.createFromPayload(
      salt,
      userId,
    ).getHashedDataString();

    const tokenPayload = TokenPayload.createFromHash(salt, hashedString);
    expect(tokenPayload).toBeInstanceOf(TokenPayload);
    expect(tokenPayload.getUserId()).toEqual(userId);
  });
});
