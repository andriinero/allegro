/*
  Warnings:

  - You are about to drop the column `lessonLinkURL` on the `Lesson` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "lessonLinkURL",
ADD COLUMN     "lessonLink" TEXT;
