import { PrismaClient } from "@prisma/client";
import { CreateUserDto } from "../../src/domain/dto/create-user.dto";
import * as process from "process";
import { encryptPass } from "../../src/domain/core/hashPassword";

const prisma = new PrismaClient()

async function main() {
  const admin = new CreateUserDto();

  admin.email = "admin@borarachar.com.br";
  admin.password = await encryptPass("Borarachar@123");
  admin.nome = "Bora Rachar";
  admin.sobreNome = "ADM";
  admin.termos = true;

  let user = await prisma.user.findUnique({
    where: { email: admin.email }
  })
  if (user == null) {
    let result = await  prisma.user.create({data : admin});
  }
}

main().then(async () => {
  await prisma.$disconnect()
})
  .catch(async (e) => {
    console.error(e)
    await  prisma.$disconnect()
    process.exit(1)
  })
