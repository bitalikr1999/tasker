import { CreateHashedPassword } from './create-hashed-password';
import { HashedPassword } from './hashed-password';

describe('Create Password', () => {
  it('is instance of CreateHashedPassowrd class ', () => {
    const createPassword = new CreateHashedPassword('password');
    expect(createPassword).toBeInstanceOf(CreateHashedPassword);
  });

  it('is salt generated after create class', () => {
    const createPassword = new CreateHashedPassword('password');
    expect(createPassword.getPasswordSalt()).toBeTruthy();
  });

  it('is return right object', async () => {
    const createPassword = new CreateHashedPassword('password');
    const hashedPassword = await createPassword.getHashedPassword();

    expect(hashedPassword).toBeInstanceOf(HashedPassword);
  });

  it('should throw error if password empty', async () => {
    const createPassword = new CreateHashedPassword(null);

    const fn = async () => {
      await createPassword.getHashedPassword();
    };

    await expect(fn).rejects.toThrowError();
  });

  describe('salt', () => {
    it('salt min value', () => {
      const createPassword = new CreateHashedPassword('password');

      expect(() => {
        createPassword.setSaltRounds(-1);
      }).toThrow(CreateHashedPassword.minSaltRoundsValidateError);
    });

    it('salt max value', () => {
      const createPassword = new CreateHashedPassword('password');

      expect(() => {
        createPassword.setSaltRounds(1000);
      }).toThrow(CreateHashedPassword.maxSaltRoundValidateError);
    });
  });
});
