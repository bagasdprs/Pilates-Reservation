"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Calendar, Dumbbell, TrendingUp, Plus, Clock, MapPin, Trash2, Loader2, AlertCircle } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

// --- TIPE DATA ---
interface BookingItem {
  id: number;
  status: string;
  created_at: string;
  ClassSchedule?: {
    date: string;
    start_time: string;
    instructor: string;
    class?: {
      name: string;
      image_url: string;
      duration: number;
    };
  };
}

interface UserProfile {
  name: string;
  email: string;
}

const activityData = [
  { day: "Mon", sessions: 1 },
  { day: "Tue", sessions: 2 },
  { day: "Wed", sessions: 0 },
  { day: "Thu", sessions: 1 },
  { day: "Fri", sessions: 3 },
  { day: "Sat", sessions: 1 },
  { day: "Sun", sessions: 0 },
];

function DashboardPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelLoading, setCancelLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storageData = localStorage.getItem("user_data");
        let userId = 1;
        if (storageData) {
          try {
            userId = JSON.parse(storageData).id;
          } catch {}
        }

        const [resProfile, resBookings] = await Promise.all([fetch(`http://localhost:8080/api/profile/${userId}`), fetch(`http://localhost:8080/api/bookings/user/${userId}`)]);

        const profileJson = await resProfile.json();
        const bookingsJson = await resBookings.json();

        if (resProfile.ok) setUser(profileJson.data);
        if (resBookings.ok) {
          const validBookings = (bookingsJson.data || []).filter((b: BookingItem) => b.ClassSchedule && b.ClassSchedule.class);
          setBookings(validBookings);
        }
      } catch (error) {
        console.error("Gagal ambil data dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCancelBooking = async (bookingId: number) => {
    setCancelLoading(true);
    try {
      const res = await fetch(`http://localhost:8080/api/bookings/${bookingId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setBookings((prev) => prev.filter((b) => b.id !== bookingId));
      } else {
        alert("Gagal membatalkan booking.");
      }
    } catch (error) {
      console.error("Error cancelling:", error);
    } finally {
      setCancelLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return { dayName: "-", dayNum: "-", full: "-" };
    const date = new Date(dateString);
    return {
      dayName: date.toLocaleDateString("en-GB", { weekday: "short" }),
      dayNum: date.toLocaleDateString("en-GB", { day: "numeric" }),
      full: date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }),
    };
  };

  const upcomingClass = bookings.length > 0 ? bookings[0] : null;
  const totalSessions = bookings.length;

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin h-10 w-10 text-pink-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      {/* 1. HEADER */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Good morning, {user?.name ? user.name.split(" ")[0] : "Member"} 👋</h1>
          <p className="text-zinc-500">Ready to sweat? You have {bookings.length} active sessions.</p>
        </div>

        <Link href="/dashboard/classes">
          <Button className="bg-pink-600 hover:bg-pink-500 text-white px-6">
            <Plus className="mr-2 h-4 w-4" />
            Book New Class
          </Button>
        </Link>
      </div>

      {/* 2. STATS CARDS */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-sm border-zinc-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-500">Total Bookings</CardTitle>
            <Dumbbell className="h-4 w-4 text-pink-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-900">{totalSessions}</div>
            <p className="text-xs text-zinc-400">Lifetime sessions</p>
          </CardContent>
        </Card>

        {/* Card 2: Next Up */}
        <Card className="shadow-sm border-zinc-200 bg-gradient-to-br from-pink-50 to-white border-pink-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-pink-900">Next Up 🔥</CardTitle>
            <Calendar className="h-4 w-4 text-pink-600" />
          </CardHeader>
          <CardContent>
            {/* REVISI: Safety Check (?. dan ||) */}
            {upcomingClass && upcomingClass.ClassSchedule && upcomingClass.ClassSchedule.class ? (
              <>
                <div className="text-xl font-bold text-pink-950 truncate">{upcomingClass.ClassSchedule?.class?.name || "Unknown Class"}</div>
                <p className="text-xs text-pink-600/80 mt-1 font-medium">
                  {formatDate(upcomingClass.ClassSchedule?.date).full} • {upcomingClass.ClassSchedule?.start_time?.slice(0, 5)}
                </p>
              </>
            ) : (
              <div className="flex flex-col justify-center h-full">
                <div className="flex items-center gap-2 text-zinc-400 mb-1">
                  <AlertCircle className="h-5 w-5" />
                  <span className="text-lg font-bold">No upcoming class</span>
                </div>
                <p className="text-xs text-zinc-400 ml-7">Book your first class now!</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-sm border-zinc-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-500">Loyalty Points</CardTitle>
            <TrendingUp className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-900">1,250</div>
            <p className="text-xs text-zinc-400">Gold Member Status</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <Card className="col-span-4 shadow-sm border-zinc-200">
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData}>
                  <XAxis dataKey="day" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{ fill: "transparent" }} contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }} />
                  <Bar dataKey="sessions" radius={[6, 6, 0, 0]} maxBarSize={40}>
                    {activityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.sessions > 0 ? "#db2777" : "#f4f4f5"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 shadow-sm border-zinc-200 flex flex-col">
          <CardHeader>
            <CardTitle>Upcoming Bookings</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto max-h-[400px] pr-2">
            {bookings.length > 0 ? (
              <div className="space-y-4">
                {bookings.map((booking) => {
                  if (!booking.ClassSchedule || !booking.ClassSchedule.class) return null;

                  const dateObj = formatDate(booking.ClassSchedule.date);

                  return (
                    <div key={booking.id} className="group flex items-center gap-4 rounded-xl border border-zinc-100 bg-white p-3 hover:border-pink-200 hover:shadow-md transition-all">
                      <div className="flex h-14 w-14 flex-col items-center justify-center rounded-lg bg-zinc-50 group-hover:bg-pink-50 transition-colors">
                        <span className="text-[10px] font-bold uppercase text-zinc-400 group-hover:text-pink-400">{dateObj.dayName}</span>
                        <span className="text-xl font-bold text-zinc-900 group-hover:text-pink-600">{dateObj.dayNum}</span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold leading-none truncate text-zinc-900">{booking.ClassSchedule.class.name}</p>
                        <div className="flex flex-wrap items-center gap-2 mt-1.5">
                          <span className="inline-flex items-center gap-1 text-[11px] text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-full">
                            <Clock className="w-3 h-3" />
                            {booking.ClassSchedule.start_time.slice(0, 5)}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[11px] text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-full">
                            <MapPin className="w-3 h-3" />
                            Main Studio
                          </span>
                          {booking.status === "confirmed" && <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Paid</span>}
                        </div>
                      </div>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-300 hover:text-red-500 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Cancel this booking?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to cancel <b>{booking.ClassSchedule.class.name}</b>?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Go Back</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleCancelBooking(booking.id)} className="bg-red-600 hover:bg-red-700 text-white">
                              {cancelLoading ? "Cancelling..." : "Yes, Cancel Booking"}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-10 text-center space-y-3">
                <div className="h-12 w-12 rounded-full bg-zinc-100 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-zinc-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-900">No upcoming bookings</p>
                  <p className="text-xs text-zinc-500">You have not booked any class yet.</p>
                </div>
                <Link href="/dashboard/classes">
                  <Button variant="outline" size="sm" className="mt-2 text-pink-600 border-pink-200 hover:bg-pink-50">
                    Book Now
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default DashboardPage;
