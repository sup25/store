-- DropForeignKey
ALTER TABLE "Status" DROP CONSTRAINT "Status_adminId_fkey";

-- AlterTable
ALTER TABLE "Status" ALTER COLUMN "adminId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "OrderAdmin" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "adminId" INTEGER NOT NULL,
    "statusId" INTEGER,

    CONSTRAINT "OrderAdmin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrderAdmin_orderId_adminId_key" ON "OrderAdmin"("orderId", "adminId");

-- AddForeignKey
ALTER TABLE "OrderAdmin" ADD CONSTRAINT "OrderAdmin_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderAdmin" ADD CONSTRAINT "OrderAdmin_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderAdmin" ADD CONSTRAINT "OrderAdmin_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Status" ADD CONSTRAINT "Status_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
