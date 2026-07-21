-- Allow an admin to unassign a time slot while preserving the booking.
ALTER TABLE "Booking" ALTER COLUMN "timeSlotId" DROP NOT NULL;
