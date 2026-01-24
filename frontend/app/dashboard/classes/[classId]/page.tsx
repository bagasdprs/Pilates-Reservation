"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Untuk tombol Back
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, Calendar, Clock, MapPin, CreditCard } from "lucide-react";
import SpotSelector from "@/components/classes/SpotSelector";
import PaymentWizard from "@/components/classes/PaymentWizard";

// function BookingPage({ params }: { params: { classId: string } }) {
function BookingPage() {
  const router = useRouter();
  const [selectedSpot, setSelectedSpot] = useState<number | null>(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  // Dummy Class Info
  const classInfo = {
    title: "Reformer Fundamentals",
    instructor: "Mira K.",
    price: 35.0,
    date: "Tue, Sep 24",
    time: "09:00 AM - 09:55 AM",
    location: "Studio A",
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800&q=80",
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      {/* 1. Header & Back Button */}
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
        {/* --- LEFT COLUMN (Class Info & Seat) --- */}
        <div className="lg:col-span-2 space-y-6">
          {/* 2. Class Summary Card */}
          <Card className="overflow-hidden">
            <CardContent className="p-0 flex flex-col sm:flex-row">
              <div className="relative h-48 w-full sm:h-auto sm:w-48 bg-zinc-100">
                <Image src={classInfo.image} alt="Class" fill className="object-cover" />
              </div>
              <div className="p-6 flex-1 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold">{classInfo.title}</h2>
                    <p className="text-muted-foreground">with Instructor {classInfo.instructor}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-bold text-primary">${classInfo.price}</span>
                    <p className="text-xs text-muted-foreground">PER SESSION</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-zinc-600">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>{classInfo.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-600">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{classInfo.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-600 col-span-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{classInfo.location} (DiroPilates HQ)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 3. SELECT MACHINE (Komponen yang kita buat tadi) */}
          <SpotSelector selectedSpot={selectedSpot} onSelect={setSelectedSpot} />
        </div>

        {/* --- RIGHT COLUMN (Payment Form) --- */}
        <div className="space-y-6">
          <Card className="h-fit sticky top-4">
            <CardContent className="p-6 space-y-6">
              <h3 className="font-semibold text-lg">Payment Details</h3>

              {/* Form Input Dummy */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500">CARD NUMBER</label>
                  <div className="relative">
                    <Input placeholder="0000 0000 0000 0000" />
                    <CreditCard className="absolute right-3 top-2.5 h-5 w-5 text-zinc-400" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500">EXPIRY</label>
                    <Input placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500">CVC</label>
                    <Input placeholder="123" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500">CARDHOLDER NAME</label>
                  <Input placeholder="Bagas D." />
                </div>
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Subtotal</span>
                  <span>${classInfo.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Service Fee</span>
                  <span>$2.50</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2">
                  <span>Total</span>
                  <span>${(classInfo.price + 2.5).toFixed(2)}</span>
                </div>
              </div>

              {/* <Button className="w-full h-12 text-base font-bold" disabled={!selectedSpot}>
                {selectedSpot ? `Pay $${(classInfo.price + 2.5).toFixed(2)}` : "Select a Spot First"}
              </Button>  */}
              <Button
                className="w-full h-12 text-base font-bold"
                disabled={!selectedSpot}
                onClick={() => setIsPaymentOpen(true)} //
              >
                {selectedSpot ? `Pay $${(classInfo.price + 2.5).toFixed(2)}` : "Select a Spot First"}
              </Button>

              <p className="text-[10px] text-center text-zinc-400 flex items-center justify-center gap-1">🔒 Payments are secure and encrypted</p>
            </CardContent>
          </Card>
        </div>
      </div>
      <PaymentWizard isOpen={isPaymentOpen} onClose={() => setIsPaymentOpen(false)} price={classInfo.price + 2.5} className={classInfo.title} />
    </div>
  );
}

export default BookingPage;
