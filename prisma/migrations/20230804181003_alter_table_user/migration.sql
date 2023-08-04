/*
  Warnings:

  - Added the required column `expiresIn` to the `tokens` table without a default value. This is not possible if the table is not empty.
  - Made the column `nome` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sobreNome` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "tokens" ADD COLUMN     "expiresIn" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "termos" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "validateUser" BOOLEAN DEFAULT false,
ALTER COLUMN "nome" SET NOT NULL,
ALTER COLUMN "sobreNome" SET NOT NULL;
