/*
  Warnings:

  - You are about to drop the column `date` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `LessonTimeSlot` table. All the data in the column will be lost.
  - Added the required column `endTime` to the `LessonTimeSlot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `LessonTimeSlot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "date";

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "duration";

-- AlterTable
ALTER TABLE "LessonTimeSlot" DROP COLUMN "duration",
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL;

-- DropEnum
DROP TYPE "LessonDuration";
