import * as bcrypt from "bcrypt-nodejs";

export async function encryptPass(pass: string) {
  const saltRounds = 10;

  const salt = await bcrypt.genSaltSync(saltRounds);

  const encrypt = await bcrypt.hashSync(pass, salt);

  return encrypt;
}

export async function comparePass(pass: string, hash: string) {
  const compare = await bcrypt.compareSync(pass, hash);

  return compare;
}
