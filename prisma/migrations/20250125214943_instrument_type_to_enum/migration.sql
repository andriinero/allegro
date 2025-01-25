/*
  Warnings:

  - You are about to drop the column `instrumentId` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the `Instrument` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "GuitarType" AS ENUM ('CLASSICAL');

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_instrumentId_fkey";

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "instrumentId",
ADD COLUMN     "guitarType" "GuitarType" NOT NULL DEFAULT 'CLASSICAL';

-- DropTable
DROP TABLE "Instrument";

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;
