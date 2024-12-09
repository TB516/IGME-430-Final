import bcrypt from 'bcrypt';

const salt = 10;

const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, salt);
};

export default hashPassword;
