/*
  Warnings:

  - A unique constraint covering the columns `[lessonId]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `lessonId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "lessonId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Booking_lessonId_key" ON "Booking"("lessonId");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
