/*
  Warnings:

  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - Added the required column `nome` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provider` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `socialId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "name",
ADD COLUMN     "nome" TEXT NOT NULL,
ADD COLUMN     "provider" TEXT NOT NULL,
ADD COLUMN     "socialId" TEXT NOT NULL;
