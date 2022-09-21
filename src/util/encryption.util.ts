import bcrypt from 'bcrypt';

export class EncryptionUtil {
  static generateHash = async (password: string, saltRounds = 10): Promise<string> => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, (err, encrypted) => {
        if (err) {
          return reject(err);
        }
        resolve(encrypted);
      });
    });
  };

  static verifyHash = (password: string, passwordHash: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, passwordHash, (err, same) => {
        if (err) {
          return reject(err);
        }
        resolve(same);
      });
    });
  };
}
