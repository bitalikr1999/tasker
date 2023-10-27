import { ITokenPayload } from '../interfaces';
import { GenerateJwtToken } from './generate-token';

const tokenPayload: ITokenPayload = {
  getHashedDataString: jest.fn().mockResolvedValue(null),
  getRole: jest.fn().mockResolvedValue(null),
  getUserId: jest.fn().mockResolvedValue(null),
};

describe('GenerateJwtToken', () => {
  let generateJwtToken: GenerateJwtToken;

  beforeEach(() => {
    generateJwtToken = new GenerateJwtToken();
  });

  it('set payload should implement ITokenPayload', () => {
    expect(() => generateJwtToken.setPayload(null)).toThrowError();
  });

  it('throw error if salt not provided', () => {
    expect(() =>
      generateJwtToken.setPayload(tokenPayload).createToken(),
    ).toThrowError();
  });

  it('throw error if payload not provided', () => {
    expect(() => generateJwtToken.setSalt('00').createToken()).toThrowError();
  });

  it('should generate jwt token', () => {
    const jwtToken = generateJwtToken
      .setPayload(tokenPayload)
      .setSalt('00')
      .createToken();

    expect(jwtToken).toBeTruthy();
    expect(typeof jwtToken).toEqual('string');
  });
});
