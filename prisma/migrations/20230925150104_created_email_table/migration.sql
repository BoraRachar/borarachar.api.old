-- CreateEnum
CREATE TYPE "TypeEmail" AS ENUM ('Cadastro', 'RecuperarSenha', 'ReseteSenha');

-- CreateTable
CREATE TABLE "emails" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "type" "TypeEmail" NOT NULL DEFAULT 'Cadastro',
    "send" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "emails_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "emails" ADD CONSTRAINT "emails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
