"use client";

import React, { useState } from "react";
import DateSelector from "@/components/classes/DateSelector";
import ClassCard from "@/components/classes/ClassCard";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";

// DUMMY DATA (Nanti diganti API)
const DUMMY_CLASSES = [
  {
    id: "1",
    title: "Sunrise Reformer Flow",
    instructor: "Mira K.",
    time: "07:00 AM",
    duration: "55 min",
    level: "Intermediate" as const,
    spotsLeft: 2, // Dikit lagi abis (Merah)
    totalSpots: 12,
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800&q=80",
    imageAlt: "Woman doing pilates reformer stretch",
  },
  {
    id: "2",
    title: "Core & Posture Align",
    instructor: "Sarah J.",
    time: "09:30 AM",
    duration: "45 min",
    level: "Beginner" as const,
    spotsLeft: 8, // Masih banyak (Pink/Primary)
    totalSpots: 12,
    image: "https://images.unsplash.com/photo-1522845036863-9c2cd011339c?w=800&q=80",
    imageAlt: "Group pilates mat session",
  },
  {
    id: "3",
    title: "Advanced Tower Power",
    instructor: "David L.",
    time: "05:00 PM",
    duration: "60 min",
    level: "Advanced" as const,
    spotsLeft: 5,
    totalSpots: 10,
    image: "https://images.unsplash.com/photo-1606907604675-9e623403567b?w=800&q=80",
    imageAlt: "Pilates tower equipment",
  },
];

function Page() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="space-y-6">
      {/* 1. Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Class Schedule</h1>
          <p className="text-muted-foreground">Find and book your next session</p>
        </div>
        {/* Filter Button (Visual only for now) */}
        <Button variant="outline" size="sm" className="gap-2 hidden sm:flex">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* 2. Date Strip Navigation (Sticky di Mobile biar UX nya enak) */}
      <div className="sticky top-0 z-10 -mx-4 bg-zinc-50/95 px-4 py-2 backdrop-blur-sm sm:static sm:mx-0 sm:bg-transparent sm:p-0">
        <DateSelector selectedDate={selectedDate} onSelect={setSelectedDate} />
      </div>

      {/* 3. Class List */}
      <div className="space-y-4">
        {/* Header Tanggal yang dipilih */}
        <div className="flex items-center gap-2 pb-2">
          <h2 className="text-lg font-semibold">{selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</h2>
          <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600">{DUMMY_CLASSES.length} Classes</span>
        </div>

        {/* Mapping Kartu */}
        <div className="grid gap-4">
          {DUMMY_CLASSES.map((item) => (
            <ClassCard key={item.id} data={item} />
          ))}
        </div>

        {/* Empty State (Kalau nanti ga ada kelas) */}
        {/* <div className="py-10 text-center text-muted-foreground">No classes available for this date.</div> */}
      </div>
    </div>
  );
}

export default Page;
