/*
  Warnings:

  - A unique constraint covering the columns `[invoiceId]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[lessonId]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[bookedById]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[reviewedById]` on the table `Review` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[lessonId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Booking_invoiceId_key" ON "Booking"("invoiceId");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_lessonId_key" ON "Booking"("lessonId");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_bookedById_key" ON "Booking"("bookedById");

-- CreateIndex
CREATE UNIQUE INDEX "Review_reviewedById_key" ON "Review"("reviewedById");

-- CreateIndex
CREATE UNIQUE INDEX "Review_lessonId_key" ON "Review"("lessonId");
