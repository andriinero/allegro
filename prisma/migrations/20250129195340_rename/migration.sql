/*
  Warnings:

  - You are about to drop the column `presence` on the `Booking` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "presence",
ADD COLUMN     "lessonPresence" "LessonPresence" NOT NULL DEFAULT 'OFFLINE';
