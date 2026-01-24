"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface ClassItem {
  id: string;
  title: string;
  instructor: string;
  time: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  spotsLeft: number;
  totalSpots: number;
  image: string;
  imageAlt: string;
}

function ClassCard({ data }: { data: ClassItem }) {
  const percentageFilled = ((data.totalSpots - data.spotsLeft) / data.totalSpots) * 100;

  const levelColor = {
    Beginner: "bg-teal-100 text-teal-700",
    Intermediate: "bg-blue-100 text-blue-700",
    Advanced: "bg-purple-100 text-purple-700",
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          {/* 1. Image Section  */}
          <div className="relative h-48 w-full sm:h-auto sm:w-48 shrink-0">
            {/* Placeholder Image  */}
            <Image src={data.image} alt={data.imageAlt} fill className="object-cover" />
            {/* Level Badge Overlay (Mobile Only) */}
            <div className={`absolute top-3 left-3 rounded-full px-2 py-1 text-[10px] font-bold uppercase sm:hidden ${levelColor[data.level]}`}>{data.level}</div>
          </div>

          {/* 2. Details Section  */}
          <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-foreground">{data.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <User className="h-3.5 w-3.5" />
                    <span>with {data.instructor}</span>
                  </div>
                </div>
                {/* Level Badge (Desktop) */}
                <span className={`hidden sm:inline-block rounded-full px-2.5 py-0.5 text-xs font-bold uppercase ${levelColor[data.level]}`}>{data.level}</span>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5 rounded-md bg-zinc-50 px-2.5 py-1 text-zinc-700">
                  <Clock className="h-3.5 w-3.5" />
                  <span className="font-semibold">{data.time}</span>
                  <span className="text-zinc-400">•</span>
                  <span>{data.duration}</span>
                </div>
              </div>
            </div>

            {/* 3. Footer: Availability & Action */}
            <div className="mt-5 flex items-end justify-between gap-4">
              <div className="flex-1 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className={cn("font-medium", data.spotsLeft <= 3 ? "text-red-500" : "text-zinc-500")}>{data.spotsLeft <= 3 ? `Only ${data.spotsLeft} spots left!` : "Availability"}</span>
                  <span className="text-zinc-400">
                    {data.spotsLeft}/{data.totalSpots}
                  </span>
                </div>
                {/* Custom Progress Bar */}
                <div className="h-1.5 w-full rounded-full bg-zinc-100">
                  <div className={cn("h-full rounded-full transition-all duration-500", data.spotsLeft <= 3 ? "bg-red-500" : "bg-primary")} style={{ width: `${percentageFilled}%` }} />
                </div>
              </div>

              {/* <Button className="shrink-0 rounded-full px-6">Book</Button> */}
              <Link href={`/dashboard/classes/${data.id}`}>
                <Button className="shrink-0 rounded-full px-6">Book</Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ClassCard;
