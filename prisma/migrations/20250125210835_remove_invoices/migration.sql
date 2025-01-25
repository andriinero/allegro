/*
  Warnings:

  - You are about to drop the column `invoiceId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `lessonId` on the `Booking` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_invoiceId_fkey";

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_lessonId_fkey";

-- DropIndex
DROP INDEX "Booking_invoiceId_key";

-- DropIndex
DROP INDEX "Booking_lessonId_key";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "invoiceId",
DROP COLUMN "lessonId";
