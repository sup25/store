/*
  Warnings:

  - The primary key for the `user information` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Id` on the `user information` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[Email]` on the table `user information` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user information" DROP CONSTRAINT "user information_pkey",
DROP COLUMN "Id",
ALTER COLUMN "Full Name" SET DATA TYPE VARCHAR(50);

-- CreateIndex
CREATE UNIQUE INDEX "user information_Email_key" ON "user information"("Email");
