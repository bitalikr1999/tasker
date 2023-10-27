import { HashedPassword } from './hashed-password';

const def = {
  hashedPasswordString:
    '$2a$10$K/hLFdohx3MA8j6s0lZ0jezaoxMrTmiuFDigAzGSHJF21PR6N.47y',
  salt: 'xNgTaUNwj5D62ii1amjWw',
};

describe('HashedPassword', () => {
  it('is instance', () => {
    const hashedPassword = new HashedPassword(
      def.salt,
      def.hashedPasswordString,
    );
    expect(hashedPassword).toBeInstanceOf(HashedPassword);
  });

  describe('compare passwords', () => {
    it('should return true', async () => {
      const hashedPassword = new HashedPassword(
        def.salt,
        def.hashedPasswordString,
      );

      const isSame = await hashedPassword.compareWithPassword('password');
      expect(isSame).toEqual(true);
    });
    it('should return false', async () => {
      const hashedPassword = new HashedPassword(
        def.salt,
        def.hashedPasswordString,
      );

      const isSame = await hashedPassword.compareWithPassword('1000000');
      expect(isSame).toEqual(false);
    });
  });
});
