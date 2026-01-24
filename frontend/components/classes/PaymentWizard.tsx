"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Calendar, ArrowRight, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface PaymentWizardProps {
  isOpen: boolean;
  onClose: () => void;
  price: number;
  className: string;
}

// Tipe Flow
type Step = "pin" | "processing" | "success";

function PaymentWizard({ isOpen, onClose, price, className }: PaymentWizardProps) {
  const [step, setStep] = useState<Step>("pin");
  const [pin, setPin] = useState(["", "", "", "", "", ""]); // 6 Digit PIN
  const [error, setError] = useState(false);

  // Reset state every open dialog
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setStep("pin");
        setPin(["", "", "", "", "", ""]);
        setError(false);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle Input PIN Logic
  const handlePinChange = (index: number, value: string) => {
    if (value.length > 1) return; // Just 1 digit

    // Update PIN state
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    setError(false);

    // Auto focus to next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`pin-${index + 1}`);
      nextInput?.focus();
    }

    // Checking PIN complete
    if (newPin.every((digit) => digit !== "") && index === 5) {
      // AUTO SUBMIT
      handleSubmitPin();
    }
  };

  const handleSubmitPin = () => {
    // 1. Step Processing
    setStep("processing");

    // 2. Timer palsu 3 detik lalu ke Success
    setTimeout(() => {
      setStep("success");
    }, 3000);
  };

  // --- RENDER CONTENT ---
  const renderContent = () => {
    // 1. PIN INPUT
    if (step === "pin") {
      return (
        <div className="flex flex-col items-center py-4 animate-in fade-in zoom-in duration-300">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-xl font-bold">Verify Payment</h2>
          <p className="text-center text-sm text-muted-foreground mt-2 mb-8">
            Enter your 6-digit security PIN to authorize the payment of
            <span className="font-bold text-foreground"> ${price.toFixed(2)}</span>
          </p>

          <div className="flex gap-2 mb-8">
            {pin.map((digit, i) => (
              <input
                key={i}
                id={`pin-${i}`}
                type="password"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handlePinChange(i, e.target.value)}
                className={cn(
                  "h-12 w-10 rounded-lg border-2 text-center text-xl font-bold outline-none transition-all",
                  error ? "border-red-500 bg-red-50 animate-pulse" : "border-zinc-200 focus:border-primary focus:ring-4 focus:ring-primary/10",
                )}
              />
            ))}
          </div>

          <p className="text-xs text-muted-foreground cursor-pointer hover:underline">Forgot PIN?</p>
        </div>
      );
    }

    // 2. PROCESSING
    if (step === "processing") {
      return (
        <div className="flex flex-col items-center justify-center py-12 animate-in fade-in duration-500">
          <svg className="animate-snake h-20 w-20" viewBox="0 0 50 50">
            <circle cx="25" cy="25" r="20"></circle>
          </svg>

          <h3 className="mt-6 text-lg font-semibold animate-pulse">Processing Payment...</h3>
          <p className="text-xs text-muted-foreground">Please do not close this window</p>
        </div>
      );
    }

    // 3. SUCCESS
    if (step === "success") {
      return (
        <div className="flex flex-col items-center py-4 animate-in slide-in-from-bottom-10 duration-500">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <Check className="h-10 w-10 text-green-600" />
          </div>

          <h2 className="text-2xl font-bold text-foreground">Payment Successful!</h2>
          <p className="text-center text-muted-foreground mt-2 mb-8">
            You have successfully booked <br />
            <span className="font-semibold text-foreground">{className}</span>
          </p>

          {/* Ticket Card Mini */}
          <div className="w-full bg-zinc-50 border border-dashed border-zinc-300 rounded-xl p-4 mb-6 flex justify-between items-center">
            <div className="text-sm">
              <p className="text-xs text-muted-foreground">DATE</p>
              <p className="font-semibold">Tue, Sep 24</p>
            </div>
            <div className="text-sm text-right">
              <p className="text-xs text-muted-foreground">TIME</p>
              <p className="font-semibold">09:00 AM</p>
            </div>
          </div>

          <div className="w-full space-y-3">
            <Link href="/dashboard" className="w-full block">
              <Button className="w-full h-11" onClick={onClose}>
                Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button variant="outline" className="w-full h-11">
              <Calendar className="mr-2 h-4 w-4" /> Add to Calendar
            </Button>
          </div>
        </div>
      );
    }
  };

  // --- MAIN RETURN ---
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-6">
        {/* Title Tersembunyi untuk Accessibility (Wajib ada di Radix UI) */}
        <DialogTitle className="sr-only">{step === "pin" ? "Verify Payment" : step === "processing" ? "Processing" : "Payment Success"}</DialogTitle>

        {/* Render Konten Berdasarkan Step */}
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
}

export default PaymentWizard;
