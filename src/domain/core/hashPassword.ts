import * as bcrypt from "bcrypt";

export class HashPassword {
  async encryptPass(pass: string) {
    const saltRounds = 10;
    const encrypt = await bcrypt.hash(pass, saltRounds);

    return encrypt;
  }

  async comparePass(pass: string, hash: string) {
    const compare = await bcrypt.compare(pass, hash);

    return compare;
  }
}
