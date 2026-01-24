"use client";

import React from "react";
import { cn } from "@/lib/utils";

// Data Type for Spot
interface Spot {
  id: number;
  status: "available" | "booked" | "selected";
}

interface SpotSelectorProps {
  selectedSpot: number | null;
  onSelect: (id: number) => void;
}

function SpotSelector({ selectedSpot, onSelect }: SpotSelectorProps) {
  const spots: Spot[] = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    status: i + 1 === 4 || i + 1 === 8 ? "booked" : "available",
  }));

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h3 className="mb-2 text-lg font-semibold">Select Machine</h3>
      <p className="mb-6 text-sm text-zinc-500">Choose your preferred spot in the studio</p>

      {/* Legend  */}
      <div className="mb-8 flex justify-center gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full border bg-white" />
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-zinc-200" />
          <span>Booked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-primary" /> {/* Pink */}
          <span>Selected</span>
        </div>
      </div>

      {/* Visual Studio Layout */}
      <div className="relative mx-auto max-w-xs rounded-2xl bg-zinc-50 p-8">
        {/* Instructor Stage */}
        <div className="mb-10 flex justify-center">
          <div className="rounded-full bg-zinc-200 px-6 py-1 text-[10px] font-bold tracking-widest text-zinc-500">INSTRUCTOR STAGE</div>
        </div>

        {/* Grid Spot  */}
        <div className="grid grid-cols-3 gap-4">
          {spots.map((spot) => {
            const isSelected = selectedSpot === spot.id;
            const isBooked = spot.status === "booked";

            return (
              <button
                key={spot.id}
                disabled={isBooked}
                onClick={() => onSelect(spot.id)}
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-xl text-sm font-semibold transition-all",
                  isBooked
                    ? "cursor-not-allowed bg-zinc-200 text-zinc-400" // Booked
                    : isSelected
                      ? "bg-primary text-white shadow-md scale-110" // Selected (Pink)
                      : "border bg-white hover:border-primary hover:text-primary", // Available
                )}
              >
                {spot.id}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SpotSelector;
