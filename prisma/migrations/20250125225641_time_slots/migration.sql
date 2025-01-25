/*
  Warnings:

  - The values [CLASSICAL] on the enum `GuitarType` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `Post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdById` on the `Post` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "GuitarType_new" AS ENUM ('ACOUSTIC', 'ELECTRICAL', 'BASS', 'SPECIALTY', 'HYBRID', 'OTHER');
ALTER TABLE "Lesson" ALTER COLUMN "guitarType" DROP DEFAULT;
ALTER TABLE "Lesson" ALTER COLUMN "guitarType" TYPE "GuitarType_new" USING ("guitarType"::text::"GuitarType_new");
ALTER TYPE "GuitarType" RENAME TO "GuitarType_old";
ALTER TYPE "GuitarType_new" RENAME TO "GuitarType";
DROP TYPE "GuitarType_old";
ALTER TABLE "Lesson" ALTER COLUMN "guitarType" SET DEFAULT 'ACOUSTIC';
COMMIT;

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_createdById_fkey";

-- AlterTable
ALTER TABLE "Lesson" ADD COLUMN     "assignment" TEXT,
ADD COLUMN     "notes" TEXT,
ALTER COLUMN "duration" DROP NOT NULL,
ALTER COLUMN "guitarType" SET DEFAULT 'ACOUSTIC';

-- AlterTable
ALTER TABLE "Post" DROP CONSTRAINT "Post_pkey",
DROP COLUMN "createdById",
ADD COLUMN     "authorId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Post_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Post_id_seq";

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LessonTimeSlot" (
    "id" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "LessonTimeSlot_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
