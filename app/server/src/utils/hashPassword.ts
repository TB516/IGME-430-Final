import bcrypt from 'bcrypt';

const salt = 10;

// Hash a string to password
const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, salt);
};

export default hashPassword;
