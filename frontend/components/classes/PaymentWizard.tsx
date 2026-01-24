"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Calendar, ArrowRight, ShieldCheck, X, RefreshCcw, CreditCard, Smartphone, QrCode, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface PaymentWizardProps {
  isOpen: boolean;
  onClose: () => void;
  price: number;
  className: string;
}

// Add 'method-selection'
type Step = "method-selection" | "pin" | "processing" | "success" | "failed";
type PaymentMethod = "card" | "ewallet" | "qris";

function PaymentWizard({ isOpen, onClose, price, className }: PaymentWizardProps) {
  // Default 'method-selection'
  const [step, setStep] = useState<Step>("method-selection");
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("card"); // Default pilih Card

  const [pin, setPin] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState(false);

  // Reset state
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setStep("method-selection");
        setPin(["", "", "", "", "", ""]);
        setError(false);
        setSelectedMethod("card");
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle Input PIN Logic
  const handlePinChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    setError(false);

    if (value && index < 5) {
      const nextInput = document.getElementById(`pin-${index + 1}`);
      nextInput?.focus();
    }

    if (newPin.every((digit) => digit !== "") && index === 5) {
      handleSubmitPin();
    }
  };

  const handleSubmitPin = () => {
    setStep("processing");

    // API Call Simulation
    setTimeout(() => {
      // 50:50 Chance Success/Failed
      const isSuccess = Math.random() > 0.5;

      if (isSuccess) {
        setStep("success");
      } else {
        setStep("failed");
      }
    }, 3000);
  };

  // Logic Retry
  const handleRetry = () => {
    setStep("method-selection");
    setPin(["", "", "", "", "", ""]);
    setError(false);
  };

  // --- RENDER CONTENT ---
  const renderContent = () => {
    // 1. METHOD SELECTION
    if (step === "method-selection") {
      return (
        <div className="flex flex-col py-2 animate-in fade-in zoom-in duration-300">
          <h2 className="text-xl font-bold text-center mb-1">Select Payment</h2>
          <p className="text-center text-sm text-muted-foreground mb-6">
            Choose how you did like to pay for <span className="font-semibold text-foreground">${price.toFixed(2)}</span>
          </p>

          <div className="space-y-3 mb-6">
            {/* OPSI 1: Credit Card (Saved) */}
            <div onClick={() => setSelectedMethod("card")} className={cn("cursor-pointer rounded-xl border-2 p-4 transition-all hover:bg-zinc-50 relative", selectedMethod === "card" ? "border-primary bg-primary/5" : "border-zinc-200")}>
              <div className="flex items-center gap-3">
                <div className={cn("h-10 w-10 rounded-full flex items-center justify-center", selectedMethod === "card" ? "bg-primary/20 text-primary" : "bg-zinc-100 text-zinc-500")}>
                  <CreditCard className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">Credit / Debit Card</p>
                  <p className="text-xs text-muted-foreground">**** 4242 (Visa)</p>
                </div>
                {selectedMethod === "card" && <Check className="h-5 w-5 text-primary" />}
              </div>
            </div>

            {/* E-Wallet */}
            <div
              onClick={() => setSelectedMethod("ewallet")}
              className={cn("cursor-pointer rounded-xl border-2 p-4 transition-all hover:bg-zinc-50 relative", selectedMethod === "ewallet" ? "border-primary bg-primary/5" : "border-zinc-200")}
            >
              <div className="flex items-center gap-3">
                <div className={cn("h-10 w-10 rounded-full flex items-center justify-center", selectedMethod === "ewallet" ? "bg-primary/20 text-primary" : "bg-zinc-100 text-zinc-500")}>
                  <Wallet className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">E-Wallet</p>
                  <p className="text-xs text-muted-foreground">GoPay, OVO, ShopeePay</p>
                </div>
                {selectedMethod === "ewallet" && <Check className="h-5 w-5 text-primary" />}
              </div>
            </div>

            {/* QRIS */}
            <div onClick={() => setSelectedMethod("qris")} className={cn("cursor-pointer rounded-xl border-2 p-4 transition-all hover:bg-zinc-50 relative", selectedMethod === "qris" ? "border-primary bg-primary/5" : "border-zinc-200")}>
              <div className="flex items-center gap-3">
                <div className={cn("h-10 w-10 rounded-full flex items-center justify-center", selectedMethod === "qris" ? "bg-primary/20 text-primary" : "bg-zinc-100 text-zinc-500")}>
                  <QrCode className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">QRIS</p>
                  <p className="text-xs text-muted-foreground">Scan to pay instantly</p>
                </div>
                {selectedMethod === "qris" && <Check className="h-5 w-5 text-primary" />}
              </div>
            </div>
          </div>

          <Button className="w-full h-11" onClick={() => setStep("pin")}>
            Confirm Payment <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    }

    // 2. PIN INPUT
    if (step === "pin") {
      return (
        <div className="flex flex-col items-center py-4 animate-in fade-in zoom-in duration-300">
          {/* Small Back Button */}
          <button onClick={() => setStep("method-selection")} className="absolute left-4 top-4 text-xs text-muted-foreground hover:text-foreground">
            &larr; Back
          </button>

          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-xl font-bold">Verify Payment</h2>
          <p className="text-center text-sm text-muted-foreground mt-2 mb-8">
            Enter your 6-digit security PIN to authorize the payment via
            {/* Tampilkan metode yang dipilih */}
            <span className="font-bold text-foreground capitalize"> {selectedMethod === "ewallet" ? "E-Wallet" : selectedMethod === "qris" ? "QRIS" : "Credit Card"}</span>
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

    // 3. PROCESSING
    if (step === "processing") {
      return (
        <div className="flex flex-col items-center justify-center py-12 animate-in fade-in duration-500">
          <svg className="animate-snake h-20 w-20" viewBox="0 0 50 50">
            <circle cx="25" cy="25" r="20"></circle>
          </svg>

          <h3 className="mt-6 text-lg font-semibold animate-pulse">Processing Payment...</h3>
          <p className="text-xs text-muted-foreground">Connecting to bank server securely</p>
        </div>
      );
    }

    // 4. SUCCESS
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

    // 5. FAILED VIEW
    if (step === "failed") {
      return (
        <div className="flex flex-col items-center py-4 animate-in slide-in-from-bottom-10 duration-500">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
            <X className="h-10 w-10 text-red-600" />
          </div>

          <h2 className="text-2xl font-bold text-foreground">Payment Failed</h2>
          <p className="text-center text-muted-foreground mt-2 mb-8 max-w-xs">We could not process your payment. This is often due to insufficient funds or bank decline.</p>

          <div className="w-full space-y-3">
            {/* Try Again Button */}
            <Button className="w-full h-11" onClick={handleRetry}>
              <RefreshCcw className="mr-2 h-4 w-4" /> Try Again / Select Method
            </Button>

            <Button variant="outline" className="w-full h-11">
              <CreditCard className="mr-2 h-4 w-4" /> Change Payment Method
            </Button>
          </div>

          <p className="mt-6 text-xs text-muted-foreground cursor-pointer hover:underline flex items-center">Help & Support</p>
        </div>
      );
    }
  };

  // --- MAIN RETURN ---
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-6">
        <DialogTitle className="sr-only">{step === "method-selection" ? "Select Payment" : step === "pin" ? "Verify Payment" : step === "processing" ? "Processing" : step === "success" ? "Payment Success" : "Payment Failed"}</DialogTitle>

        {renderContent()}
      </DialogContent>
    </Dialog>
  );
}

export default PaymentWizard;
