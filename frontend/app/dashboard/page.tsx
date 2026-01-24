"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Calendar, Dumbbell, TrendingUp, Plus } from "lucide-react";

// Dummy Data for Chart (Weekly Activity)
const activityData = [
  { day: "Mon", sessions: 0 },
  { day: "Tue", sessions: 1 }, // Active
  { day: "Wed", sessions: 0 },
  { day: "Thu", sessions: 2 }, // Active
  { day: "Fri", sessions: 1 }, // Active
  { day: "Sat", sessions: 0 },
  { day: "Sun", sessions: 0 },
];

function Page() {
  return (
    <div className="space-y-8">
      {/* 1. Header Section */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Good morning, Bagas 👋</h1>
          <p className="text-muted-foreground">Ready for a mindful session today?</p>
        </div>

        <Link href="/dashboard/classes">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Book New Class
          </Button>
        </Link>
      </div>

      {/* 2. Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
            {/* Ubah warna icon jadi primary (Pink) */}
            <Dumbbell className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+4 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Coming Up</CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Reformer Flow</div>
            <p className="text-xs text-muted-foreground">Tomorrow, 09:00 AM</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Loyalty Points</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,250</div>
            <p className="text-xs text-muted-foreground">Gold Member Status</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        {/* 3. Weekly Activity Chart */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData}>
                  <XAxis dataKey="day" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{ fill: "transparent" }} contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
                  <Bar dataKey="sessions" radius={[4, 4, 0, 0]} maxBarSize={40}>
                    {activityData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        // GUNAKAN VARIABLE CSS AGAR IKUT TEMA
                        fill={entry.sessions > 0 ? "var(--primary)" : "var(--muted)"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* 4. Recent/Upcoming List */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Item 1 */}
              <div className="flex items-center gap-4 rounded-lg border p-3">
                <div className="flex h-12 w-12 flex-col items-center justify-center rounded-md bg-muted px-2 py-1">
                  <span className="text-[10px] font-bold uppercase text-muted-foreground">OCT</span>
                  <span className="text-lg font-bold text-foreground">23</span>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Pilates Reformer</p>
                  <p className="text-xs text-muted-foreground">10:30 AM • Instructor Mira</p>
                </div>
                <Button variant="outline" size="sm" className="h-8">
                  Manage
                </Button>
              </div>

              {/* Item 2 */}
              <div className="flex items-center gap-4 rounded-lg border p-3">
                <div className="flex h-12 w-12 flex-col items-center justify-center rounded-md bg-muted px-2 py-1">
                  <span className="text-[10px] font-bold uppercase text-muted-foreground">OCT</span>
                  <span className="text-lg font-bold text-foreground">25</span>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Barre Fusion</p>
                  <p className="text-xs text-muted-foreground">05:30 PM • Instructor Sarah</p>
                </div>
                <Button variant="outline" size="sm" className="h-8">
                  Manage
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Page;
