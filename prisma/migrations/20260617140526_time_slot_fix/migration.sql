/*
  Warnings:

  - You are about to drop the column `date` on the `LessonTimeSlot` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "LessonTimeSlot" DROP COLUMN "date",
ADD COLUMN     "presence" "LessonPresence" NOT NULL DEFAULT 'ONLINE';
