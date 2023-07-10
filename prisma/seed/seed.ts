import { PrismaClient } from "@prisma/client";
import { CreateUserDto } from "../../src/domain/dto/create-user.dto";
import * as process from "process";
import { encryptPass } from "../../src/domain/core/hashPassword";

const prisma = new PrismaClient()

async function main() {
  const admin = new CreateUserDto();

  const pass = await encryptPass("Borarachar@123");

  admin.email = "admin@borarachar.com.br";
  admin.password == pass;

  let result = await  prisma.user.create({data : admin});

  console.log(result)
}

main().then(async () => {
  await prisma.$disconnect()
})
  .catch(async (e) => {
    console.error(e)
    await  prisma.$disconnect()
    process.exit(1)
  })
