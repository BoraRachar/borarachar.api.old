-- AlterTable
ALTER TABLE "users" ADD COLUMN     "sobreNome" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "keys" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "validate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "keys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tokens" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "validate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "keys_value_key" ON "keys"("value");

-- AddForeignKey
ALTER TABLE "keys" ADD CONSTRAINT "keys_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
