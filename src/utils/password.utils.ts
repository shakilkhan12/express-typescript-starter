import bcrypt from "bcrypt";

const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const comparePassword = async (candidatePassword: string, hashedPassword: string): Promise<boolean> => {
  const isMatch = await bcrypt.compare(candidatePassword, hashedPassword);
  return isMatch;
};

export { hashPassword, comparePassword };