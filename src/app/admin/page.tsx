"use client";

import LessonReviewsMetric from "./(overview)/lesson-reviews-metric";
import LessonsTakenMetric from "./(overview)/lessons-taken-metric";
import TotalBookingsMetric from "./(overview)/total-bookings-metric";
import UserCountMetric from "./(overview)/user-count-metric";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
      <div className="flex gap-4">
        <UserCountMetric />

        <TotalBookingsMetric />

        <LessonsTakenMetric />

        <LessonReviewsMetric />
      </div>
    </div>
  );
}
