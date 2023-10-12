import { compare, genSalt, hash } from 'bcryptjs';

const SALT_RANDOMS = 8;

const hashPasswords = async (password: string): Promise<string> => {
  const saltGenerated = await genSalt(SALT_RANDOMS);

  return await hash(password, saltGenerated);
};

const verifyPasswords = async (
  password: string,
  hashPassword: string,
): Promise<boolean> => {
  return await compare(password, hashPassword);
};

export const PasswordBcryptjs = {
  hashPasswords,
  verifyPasswords,
};
