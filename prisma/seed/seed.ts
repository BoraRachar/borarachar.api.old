import { PrismaClient } from "@prisma/client";
import * as process from "process";
import { encryptPass } from "../../src/domain/core/hashPassword";
import { UserDto } from "../../src/domain/dto/user.dto";

const prisma = new PrismaClient()

async function main() {
  const admin = new UserDto();

  admin.email = "admin@borarachar.com.br";
  admin.password = await encryptPass("Borarachar@123");
  admin.nome = "Bora Rachar";
  admin.sobreNome = "ADM";
  admin.termos = true;

  let user = await prisma.user.findUnique({
    where: { email: admin.email }
  })

  console.info("User: ", user != null ? user.id : 'Não Criado');

  if (user == null) {
    await  prisma.user.create({data : admin});

    await prisma.user.update({
      where: {
        email: admin.email,
      },
      data: {
        validateUser: true,
      }
    });

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
