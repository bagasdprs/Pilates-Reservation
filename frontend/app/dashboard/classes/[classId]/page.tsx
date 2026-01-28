"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, Calendar, Clock, MapPin, CreditCard, Loader2 } from "lucide-react";
import SpotSelector from "@/components/classes/SpotSelector";
import PaymentWizard from "@/components/classes/PaymentWizard";

interface ClassData {
  id: number;
  date: string;
  start_time: string;
  instructor: string;
  class: {
    name: string;
    price: number;
    image_url: string;
    description: string;
  };
}

function BookingPage({ params }: { params: Promise<{ classId: string }> }) {
  const resolvedParams = use(params);
  const classId = resolvedParams.classId;

  const router = useRouter();

  // State Data Real
  const [schedule, setSchedule] = useState<ClassData | null>(null);
  const [loading, setLoading] = useState(true);

  // State UI
  const [selectedSpot, setSelectedSpot] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  // 2. FETCH DATA REAL
  useEffect(() => {
    if (!classId) return;
    const fetchScheduleDetail = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:8080/api/schedules/${classId}`);
        const data = await res.json();

        if (res.ok) {
          setSchedule(data.data);
        } else {
          console.error("Failed to retrieve schedule data");
        }
      } catch (error) {
        console.error("Error fetching:", error);
      } finally {
        setLoading(false);
      }
    };
    // const fetchScheduleDetail = async () => {
    //   try {
    //     const token = localStorage.getItem("user_data");
    //     if (!token) {
    //       router.push("/login");
    //       return;
    //     }

    //     // URL: /api/schedules/1
    //     const res = await fetch(`http://localhost:8080/api/schedules/${classId}`);
    //     const data = await res.json();

    //     if (res.ok) {
    //       setSchedule(data.data); // Save data to state
    //     } else {
    //       console.error("Failed to retrieve schedule data");
    //     }
    //   } catch (error) {
    //     console.error("Error fetching:", error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    fetchScheduleDetail();
  }, [classId, router]);

  // 3. B0OOKING Function
  const handleBooking = async () => {
    setIsProcessing(true);

    try {
      const userStorage = localStorage.getItem("user_data");
      // const userId = userStorage ? JSON.parse(userStorage).id : null;
      let userId;
      if (userStorage) {
        try {
          userId = JSON.parse(userStorage).id;
        } catch {
          userId = 1;
        }
      } else {
        userId = 1; // Default ke User ID 1 kalau belum login
      }

      const res = await fetch("http://localhost:8080/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId, // Send ID User
          class_schedule_id: parseInt(classId), // Send ID Schedule
          // class_schedule_id: parseInt(params.classId),
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Booking Failed");

      // SUCCESS!
      setIsPaymentOpen(true); // Open PaymentWizard
    } catch (err: Error | unknown) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      alert("Booking Failed: " + errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  // --- LOADING VIEW ---
  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Loader2 className="animate-spin text-pink-600 w-10 h-10" />
      </div>
    );
  }

  // --- IF THE DATA CANNOT BE FOUND ---
  if (!schedule) {
    return <div className="text-center p-10">Schedule not found.</div>;
  }

  // Total (Service Fee $2.5 flat)
  const serviceFee = 2.5;
  const totalPrice = schedule.class.price + serviceFee;
  // const totalPrice = schedule.Class.price + serviceFee;

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20 p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Review Booking</h1>
          <p className="text-muted-foreground">Complete your reservation</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* --- LEFT COLUMN --- */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-0 flex flex-col sm:flex-row">
              <div className="relative h-48 w-full sm:h-auto sm:w-48 bg-zinc-100">
                <Image src={schedule.class.image_url || "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800&q=80"} alt="Class" fill className="object-cover" />
              </div>
              <div className="p-6 flex-1 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    {/* Data Real Class Name */}
                    <h2 className="text-xl font-bold">{schedule.class.name}</h2>
                    <p className="text-muted-foreground">with Instructor {schedule.instructor}</p>
                  </div>
                  <div className="text-right">
                    {/* Data Real Price */}
                    <span className="text-xl font-bold text-pink-600">${schedule.class.price}</span>
                    <p className="text-xs text-muted-foreground">PER SESSION</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-zinc-600">
                    <Calendar className="h-4 w-4 text-pink-500" />
                    <span>{schedule.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-600">
                    <Clock className="h-4 w-4 text-pink-500" />
                    <span>{schedule.start_time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-600 col-span-2">
                    <MapPin className="h-4 w-4 text-pink-500" />
                    <span>Diro Pilates Studio HQ</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Spot Selector */}
          <SpotSelector selectedSpot={selectedSpot} onSelect={setSelectedSpot} />
        </div>

        {/* --- RIGHT COLUMN (Payment) --- */}
        <div className="space-y-6">
          <Card className="h-fit sticky top-4 shadow-lg border-pink-100">
            <CardContent className="p-6 space-y-6">
              <h3 className="font-semibold text-lg">Payment Details</h3>

              {/* Form Input Dummy  */}
              <div className="space-y-4 opacity-75 grayscale-[0.5] pointer-events-none">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500">CARD NUMBER</label>
                  <div className="relative">
                    <Input placeholder="•••• •••• •••• 4242" defaultValue="4242 4242 4242 4242" />
                    <CreditCard className="absolute right-3 top-2.5 h-5 w-5 text-zinc-400" />
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Subtotal</span>
                  <span>${schedule.class.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Service Fee</span>
                  <span>${serviceFee}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2">
                  <span>Total</span>
                  <span>${totalPrice}</span>
                </div>
              </div>

              {/* TOMBOL PAY YANG SUDAH HIDUP */}
              <Button className="w-full h-12 text-base font-bold bg-pink-600 hover:bg-pink-700 shadow-lg shadow-pink-200" disabled={!selectedSpot || isProcessing} onClick={handleBooking}>
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                  </>
                ) : selectedSpot ? (
                  `Pay $${totalPrice}`
                ) : (
                  "Select a Spot First"
                )}
              </Button>

              <p className="text-[10px] text-center text-zinc-400 flex items-center justify-center gap-1">🔒 Payments are secure and encrypted</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Payment Wizard muncul kalau sukses */}
      <PaymentWizard
        isOpen={isPaymentOpen}
        onClose={() => {
          setIsPaymentOpen(false);
          router.push("/dashboard");
        }}
        price={totalPrice}
        className={schedule.class.name}
      />
    </div>
  );
}

export default BookingPage;
