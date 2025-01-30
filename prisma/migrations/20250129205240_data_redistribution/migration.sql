/*
  Warnings:

  - You are about to drop the column `guitarType` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `presence` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `proficiency` on the `Lesson` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Booking" ALTER COLUMN "lessonPresence" SET DEFAULT 'ONLINE';

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "guitarType",
DROP COLUMN "presence",
DROP COLUMN "proficiency",
ADD COLUMN     "lessonLinkURL" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "guitarType" "GuitarType" NOT NULL DEFAULT 'ACOUSTIC',
ADD COLUMN     "proficiency" "ProficiencyLevel" NOT NULL DEFAULT 'BEGINNER';
