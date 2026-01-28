"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DateSelector from "@/components/classes/DateSelector";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, Loader2, Clock, MapPin, User } from "lucide-react";
// import ClassCard from "@/components/classes/ClassCard";
// import { format } from "date-fns";

// Tipe Data
interface ScheduleItem {
  id: number;
  title: string;
  instructor: string;
  time: string;
  duration: string;
  level: string;
  spotsLeft: number;
  totalSpots: number;
  image: string;
}

// Interface untuk Data Mentah dari Backend
interface BackendScheduleItem {
  id: number;
  start_time: string;
  instructor: string;
  capacity: number;
  booked: number;
  class: {
    name: string;
    duration: number;
    image_url: string;
  };
}

function ClassesPage() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(false);

  // 2. FUNCTION FETCH DATA API
  useEffect(() => {
    const fetchSchedules = async () => {
      setLoading(true);
      try {
        const dateString = selectedDate.toISOString().split("T")[0];
        console.log("Fetching date:", dateString); // Cek tanggal di console browser

        // Tembak API
        const res = await fetch(`http://localhost:8080/api/schedules?date=${dateString}`);

        // --- TAMBAHAN DEBUGGING ---
        console.log("Status API:", res.status); // Cek apakah 200, 404, atau 500

        // Jangan langsung res.json() kalau error
        if (!res.ok) {
          const text = await res.text(); // Baca error sebagai text biasa
          console.error("Error Backend:", text);
          throw new Error(`API Error: ${res.status} ${text}`);
        }
        // ---------------------------

        const result = await res.json(); // Baru aman di-parse
        console.log("Data API:", result); // Lihat isinya apa

        if (result.data) {
          // MAPPING DATA
          const mappedData = result.data.map((item: BackendScheduleItem) => ({
            id: item.id,
            title: item.class?.name || "Unknown Class",
            instructor: item.instructor,
            time: item.start_time,
            duration: (item.class?.duration || 0) + " min",
            level: "All Levels",
            spotsLeft: item.capacity - item.booked,
            totalSpots: item.capacity,
            image: item.class?.image_url || "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800&q=80",
          }));
          // const mappedData = result.data.map((item: BackendScheduleItem) => ({
          //   id: item.id,
          //   title: item.class.name, // Pastikan Backend kirim preload "Class"
          //   instructor: item.instructor,
          //   time: item.start_time,
          //   duration: item.class.duration + " min",
          //   level: "All Levels",
          //   spotsLeft: item.capacity - item.booked,
          //   totalSpots: item.capacity,
          //   image: item.class?.image_url || "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800&q=80",
          // }));
          setSchedules(mappedData);
        } else {
          setSchedules([]);
        }
      } catch (error) {
        console.error("Gagal ambil jadwal:", error);
        setSchedules([]);
      } finally {
        setLoading(false);
      }
    };
    // const fetchSchedules = async () => {
    //   setLoading(true);
    //   try {
    //     const dateString = selectedDate.toISOString().split("T")[0];

    //     // Tembak API Backend
    //     const res = await fetch(`http://localhost:8080/api/schedules?date=${dateString}`);
    //     const result = await res.json();

    //     if (res.ok) {
    //       const mappedData = result.data.map((item: BackendScheduleItem) => ({
    //         id: item.id,
    //         title: item.class.name,
    //         instructor: item.instructor,
    //         time: item.start_time,
    //         duration: item.class.duration + " min",
    //         level: "All Levels",
    //         spotsLeft: item.capacity - item.booked,
    //         totalSpots: item.capacity,
    //         // Pakai optional chaining (?) biar ga error kalau image_url kosong
    //         image: item.class?.image_url || "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800&q=80",
    //       }));
    //       setSchedules(mappedData);
    //     } else {
    //       setSchedules([]);
    //     }
    //   } catch (error) {
    //     console.error("Gagal ambil jadwal:", error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    fetchSchedules();
  }, [selectedDate]);

  // 2. GROUPING LOGIC (The "Image 3" Strategy)
  // Kita pisahkan data menjadi Morning, Afternoon, Evening
  const groupedSchedules = {
    morning: schedules.filter((s) => parseInt(s.time.split(":")[0]) < 12),
    afternoon: schedules.filter((s) => {
      const hour = parseInt(s.time.split(":")[0]);
      return hour >= 12 && hour < 17;
    }),
    evening: schedules.filter((s) => parseInt(s.time.split(":")[0]) >= 17),
  };

  // Komponen Helper: Kartu Horizontal (The "Mix" Design)
  const ScheduleCard = ({ item }: { item: ScheduleItem }) => (
    <div className="group flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-2xl border border-zinc-100 hover:border-pink-200 hover:shadow-lg transition-all duration-300">
      {/* BAGIAN 1: FOTO (Dibuat agak besar ala Image 1, tapi posisi di kiri ala Image 3) */}
      <div className="relative w-full sm:w-32 h-32 flex-shrink-0 overflow-hidden rounded-xl bg-zinc-100">
        <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        {/* Badge Sisa Slot */}
        {item.spotsLeft <= 3 && <div className="absolute bottom-0 left-0 right-0 bg-red-500/90 text-white text-[10px] font-bold text-center py-1">Only {item.spotsLeft} spots left!</div>}
      </div>

      {/* BAGIAN 2: INFO TENGAH */}
      <div className="flex-1 flex flex-col justify-center space-y-2">
        <div className="flex items-center gap-2 text-pink-600 font-bold text-lg">
          <Clock className="w-4 h-4" />
          {item.time} <span className="text-zinc-300 font-light">|</span> <span className="text-zinc-500 text-sm font-medium">{item.duration}</span>
        </div>

        {/* ScheduleCard */}
        <div>
          <h3 className="font-bold text-xl text-zinc-900 leading-tight">{item.title}</h3>
          <div className="flex flex-wrap items-center gap-4 mt-1 text-zinc-500 text-sm">
            {/* Info Instruktur */}
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              <span>{item.instructor}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>Main Studio</span>
            </div>
          </div>
        </div>

        {/* Badge Level */}
        <div className="flex gap-2">
          <span className="bg-zinc-100 text-zinc-600 text-xs px-2 py-0.5 rounded-md font-medium">{item.level}</span>
        </div>
      </div>

      {/* BAGIAN 3: TOMBOL BOOK (Style Image 3 - Gelap & Compact) */}
      <div className="flex flex-col justify-center items-end border-t sm:border-t-0 sm:border-l sm:pl-4 pt-4 sm:pt-0 mt-2 sm:mt-0 gap-2">
        {/* Indikator Bar */}
        <div className="text-xs text-zinc-400 font-medium mb-1">
          {item.spotsLeft} / {item.totalSpots} Available
        </div>

        <Button onClick={() => router.push(`/dashboard/classes/${item.id}`)} className="w-full sm:w-auto bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl h-11 px-6 font-semibold shadow-md hover:shadow-xl transition-all">
          Book Now
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 pb-20">
      {/* --- HEADER --- */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Class Schedule</h1>
          <p className="text-muted-foreground mt-1">Find your flow and book your spot.</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2 hidden sm:flex border-zinc-200">
          <SlidersHorizontal className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* --- DATE SELECTOR (Style Image 1 - Clean & Big) --- */}
      <div className="sticky top-0 z-20 -mx-4 bg-white/80 px-4 py-3 backdrop-blur-md border-b border-zinc-100 sm:static sm:mx-0 sm:bg-transparent sm:p-0 sm:border-none">
        <DateSelector selectedDate={selectedDate} onSelect={setSelectedDate} />
      </div>

      {/* --- CONTENT LIST (Style Image 3 - Grouped) --- */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="animate-spin text-pink-600 w-10 h-10" />
          <p className="text-zinc-400 text-sm">Checking available slots...</p>
        </div>
      ) : schedules.length > 0 ? (
        <div className="space-y-10">
          {/* MORNING GROUP */}
          {groupedSchedules.morning.length > 0 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-2 text-pink-600 bg-pink-50 w-fit px-4 py-1.5 rounded-full">
                <span className="text-lg">🌅</span>
                <h2 className="font-bold text-sm uppercase tracking-wide">Morning Sessions</h2>
              </div>
              {groupedSchedules.morning.map((item) => (
                <ScheduleCard key={item.id} item={item} />
              ))}
            </div>
          )}

          {/* AFTERNOON GROUP */}
          {groupedSchedules.afternoon.length > 0 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
              <div className="flex items-center gap-2 text-orange-600 bg-orange-50 w-fit px-4 py-1.5 rounded-full">
                <span className="text-lg">☀️</span>
                <h2 className="font-bold text-sm uppercase tracking-wide">Afternoon Sessions</h2>
              </div>
              {groupedSchedules.afternoon.map((item) => (
                <ScheduleCard key={item.id} item={item} />
              ))}
            </div>
          )}

          {/* EVENING GROUP */}
          {groupedSchedules.evening.length > 0 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
              <div className="flex items-center gap-2 text-indigo-600 bg-indigo-50 w-fit px-4 py-1.5 rounded-full">
                <span className="text-lg">🌙</span>
                <h2 className="font-bold text-sm uppercase tracking-wide">Evening Sessions</h2>
              </div>
              {groupedSchedules.evening.map((item) => (
                <ScheduleCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Empty State */
        <div className="py-20 text-center border-2 border-dashed border-zinc-200 rounded-3xl bg-zinc-50/50">
          <p className="text-zinc-500 font-medium">No classes scheduled for {selectedDate.toLocaleDateString("en-GB")}.</p>
          <Button variant="link" className="text-pink-600" onClick={() => setSelectedDate(new Date())}>
            View Today is Schedule
          </Button>
        </div>
      )}
    </div>
  );
}

export default ClassesPage;
