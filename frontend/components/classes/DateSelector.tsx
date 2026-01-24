"use client";

import React from "react";
import { cn } from "@/lib/utils";

// Helper untuk generate 7 hari ke depan
const getNextDays = (days: number) => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date);
  }
  return dates;
};

interface DateSelectorProps {
  selectedDate: Date;
  onSelect: (date: Date) => void;
}

function DateSelector({ selectedDate, onSelect }: DateSelectorProps) {
  const dates = getNextDays(14); // Generate next 2 weeks

  return (
    <div className="w-full overflow-x-auto pb-4 scrollbar-hide">
      <div className="flex gap-3">
        {dates.map((date, index) => {
          // Check if the date is selected
          const isSelected = date.getDate() === selectedDate.getDate() && date.getMonth() === selectedDate.getMonth();

          return (
            <button
              key={index}
              onClick={() => onSelect(date)}
              className={cn(
                "flex min-w-17.5 flex-col items-center justify-center rounded-2xl border py-3 transition-all duration-200",
                isSelected
                  ? "bg-zinc-900 text-white shadow-md border-zinc-900 scale-105" // Active State
                  : "bg-white text-zinc-500 hover:border-zinc-300 hover:bg-zinc-50", // Inactive State
              )}
            >
              <span className="text-[10px] font-medium uppercase tracking-wider opacity-80">{date.toLocaleDateString("en-US", { weekday: "short" })}</span>
              <span className={cn("text-xl font-bold", isSelected ? "text-white" : "text-zinc-900")}>{date.getDate()}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default DateSelector;
