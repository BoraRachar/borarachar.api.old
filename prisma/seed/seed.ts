import { PrismaClient } from "@prisma/client";
import { CreateUserDto } from "../../src/domain/dto/create-user.dto";
import * as process from "process";
import { HashPassword } from "../../src/domain/core/hashPassword";

const prisma = new PrismaClient()

async function main(hashPassword: HashPassword) {
  const admin = new CreateUserDto();

  const pass = await hashPassword.encryptPass("Borarachar@123");

  admin.email = "admin@borarachar.com.br";
  admin.password == pass;

  let result = await  prisma.user.create({data : admin});

  console.log(result)
}
// ver erro da linha abaixo com o luis

main(new HashPassword).then(async () => {
  await prisma.$disconnect()
})
  .catch(async (e) => {
    console.error(e)
    await  prisma.$disconnect()
    process.exit(1)
  })
