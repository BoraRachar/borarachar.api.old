-- CreateEnum
CREATE TYPE "TypeKey" AS ENUM ('Cadastro', 'RecuperarSenha', 'ResendEmailConfirmar');

-- AlterTable
ALTER TABLE "keys" ADD COLUMN     "type" "TypeKey" NOT NULL DEFAULT 'Cadastro';
