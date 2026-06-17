/*
  Warnings:

  - The values [FAILED] on the enum `InvoiceStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [INSTRUCTOR] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `url` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `end` on the `LessonTimeSlot` table. All the data in the column will be lost.
  - You are about to drop the column `start` on the `LessonTimeSlot` table. All the data in the column will be lost.
  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[timeSlotId]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `timeSlotId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Made the column `title` on table `Lesson` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `date` to the `LessonTimeSlot` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LessonDuration" AS ENUM ('THIRTY_MINUTES', 'FORTY_FIVE_MINUTES', 'ONE_HOUR', 'ONE_AND_A_HALF_HOURS', 'TWO_HOURS');

-- AlterEnum
BEGIN;
CREATE TYPE "InvoiceStatus_new" AS ENUM ('PENDING', 'COMPLETED', 'CANCELLED', 'REFUNDED');
ALTER TABLE "Invoice" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Invoice" ALTER COLUMN "status" TYPE "InvoiceStatus_new" USING ("status"::text::"InvoiceStatus_new");
ALTER TYPE "InvoiceStatus" RENAME TO "InvoiceStatus_old";
ALTER TYPE "InvoiceStatus_new" RENAME TO "InvoiceStatus";
DROP TYPE "InvoiceStatus_old";
ALTER TABLE "Invoice" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "UserRole_new" AS ENUM ('USER', 'ADMIN');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "UserRole_new" USING ("role"::text::"UserRole_new");
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "UserRole_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'USER';
COMMIT;

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_reviewedById_fkey";

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "timeSlotId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "url";

-- AlterTable
ALTER TABLE "Lesson" ALTER COLUMN "title" SET NOT NULL;

-- AlterTable
ALTER TABLE "LessonTimeSlot" DROP COLUMN "end",
DROP COLUMN "start",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "duration" "LessonDuration" NOT NULL DEFAULT 'FORTY_FIVE_MINUTES';

-- DropTable
DROP TABLE "Comment";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "Review";

-- CreateIndex
CREATE UNIQUE INDEX "Booking_timeSlotId_key" ON "Booking"("timeSlotId");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_timeSlotId_fkey" FOREIGN KEY ("timeSlotId") REFERENCES "LessonTimeSlot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
