import * as bcrypt from 'bcrypt';

async function encodePassword(
  rawPassword: string,
) {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hash(rawPassword, salt);
}

export default encodePassword;
