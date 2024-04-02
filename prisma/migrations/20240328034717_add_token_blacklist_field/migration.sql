/*
  Warnings:

  - You are about to drop the column `blocked` on the `Token` table. All the data in the column will be lost.
  - You are about to drop the column `metadata` on the `Token` table. All the data in the column will be lost.
  - You are about to drop the column `used_at` on the `Token` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Token" DROP COLUMN "blocked",
DROP COLUMN "metadata",
DROP COLUMN "used_at",
ADD COLUMN     "black_list" BOOLEAN NOT NULL DEFAULT false;
