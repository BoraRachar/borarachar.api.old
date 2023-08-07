import bcrypt from "bcrypt";

export async function encryptPass(pass: string) {
  const saltRounds = 10;
  const encrypt = await bcrypt.hash(pass, saltRounds);

  return encrypt;
}

export async function comparePass(pass: string, hash: string) {
  const compare = await bcrypt.compare(pass, hash);

  return compare;
}
