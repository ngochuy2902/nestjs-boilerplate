import * as bcrypt from 'bcrypt';

const generateHash = async (password: string, saltRounds = 10): Promise<string> => {
  return bcrypt.hash(password, saltRounds);
};

const verifyHash = async (password: string, passwordHash: string): Promise<boolean> => {
  return bcrypt.compare(password, passwordHash);
};

export default { generateHash, verifyHash };
