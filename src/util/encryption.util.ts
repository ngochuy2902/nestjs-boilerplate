import * as bcrypt from 'bcrypt';

export class EncryptionUtil {
  static generateHash = async (password: string, saltRounds = 10): Promise<string> => {
    return bcrypt.hash(password, saltRounds);
  };

  static verifyHash = async (password: string, passwordHash: string): Promise<boolean> => {
    return bcrypt.compare(password, passwordHash);
  };
}
