"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Calendar, ArrowRight, ShieldCheck, X, RefreshCcw, CreditCard, Smartphone, QrCode, Wallet, Timer, RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface PaymentWizardProps {
  isOpen: boolean;
  onClose: () => void;
  price: number;
  className: string;
}

// Add 'method-selection'
type Step = "method-selection" | "pin" | "qris-scan" | "processing" | "success" | "failed";
type PaymentMethod = "card" | "ewallet" | "qris";

function PaymentWizard({ isOpen, onClose, price, className }: PaymentWizardProps) {
  const [step, setStep] = useState<Step>("method-selection");
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("card");
  const [pin, setPin] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState(false);
  const [timeLeft, setTimeLeft] = useState(500);

  // Reset state
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setStep("method-selection");
        setPin(["", "", "", "", "", ""]);
        setError(false);
        setSelectedMethod("card");
        setTimeLeft(500);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Logic Timer Countdown QRIS
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === "qris-scan" && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    //  else if (timeLeft === 0) {
    //   // setStep("failed");
    // }
    return () => clearInterval(interval);
  }, [step, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleConfirmMethod = () => {
    if (selectedMethod === "qris") {
      setStep("qris-scan");
    } else {
      setStep("pin");
    }
  };

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
    setTimeout(() => {
      const isSuccess = Math.random() > 0.3;
      if (isSuccess) {
        setStep("success");
      } else {
        setStep("failed");
      }
    }, 3000);
  };

  const startProcessing = () => {
    setStep("processing");
    setTimeout(() => {
      const isSuccess = Math.random() > 0.3;
      if (isSuccess) setStep("success");
      else setStep("failed");
    }, 3000);
  };

  const handleCheckStatus = () => {
    startProcessing();
  };

  // Logic Retry
  const handleRetry = () => {
    setStep("method-selection");
    setPin(["", "", "", "", "", ""]);
    setError(false);
    setTimeLeft(500);
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
            {/* Card Option */}
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

            {/* E-Wallet Option */}
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

            {/* QRIS Option */}
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

          <Button className="w-full h-11" onClick={handleConfirmMethod}>
            {selectedMethod === "qris" ? "Generate QR Code" : "Confirm Payment"} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    }

    // 2. PIN INPUT
    if (step === "pin") {
      return (
        <div className="flex flex-col items-center py-4 animate-in fade-in zoom-in duration-300">
          <button onClick={() => setStep("method-selection")} className="absolute left-4 top-4 text-xs text-muted-foreground hover:text-foreground">
            &larr; Back
          </button>

          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-xl font-bold">Verify Payment</h2>
          <p className="text-center text-sm text-muted-foreground mt-2 mb-8">
            Enter PIN for <span className="font-bold text-foreground capitalize"> {selectedMethod}</span>
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

    // 3. QRIS SCAN POPUP
    if (step === "qris-scan") {
      return (
        <div className="flex flex-col items-center py-2 animate-in fade-in zoom-in duration-300">
          <button onClick={() => setStep("method-selection")} className="absolute left-4 top-4 text-xs text-muted-foreground hover:text-foreground">
            &larr; Back
          </button>

          <h2 className="text-xl font-bold mb-1">Scan to Pay</h2>
          <div className="flex items-center gap-1 mb-6">
            <p className="text-sm text-muted-foreground">Pay with</p>
            {/* Logo Text QRIS */}
            <span className="font-bold text-slate-800 text-sm italic">QRIS</span>
          </div>

          {/* Container QR Code */}
          <div className="bg-white p-6 rounded-2xl mb-4 border border-zinc-100 shadow-sm flex flex-col items-center">
            <div className="relative mb-3">
              {/* --- CHANGE: Pakai Image API biar real --- */}
              {/* Kita pakai API dari goqr.me atau qrserver.com */}
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=DiroPilates-Booking-${price}`} alt="QR Code Payment" className="h-40 w-40 mix-blend-multiply opacity-90" />

              {/* (Opsional) Logo di tengah QR biar makin mirip GoPay/BCA */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-white p-1 rounded-full shadow-sm">
                  <ShieldCheck className="h-6 w-6 text-primary fill-primary/10" />
                </div>
              </div>
            </div>

            <div className="bg-zinc-50 px-3 py-1 rounded-full border border-zinc-100">
              <p className="text-[10px] font-mono text-zinc-500">ID: 8839-2026-DIRO</p>
            </div>
          </div>

          {/* Timer - Background Orange muda biar warm */}
          <div className="flex items-center gap-2 text-orange-600 bg-orange-50 px-3 py-1.5 rounded-full mb-6">
            <Timer className="h-4 w-4" />
            <p className="text-sm font-semibold">Valid for {formatTime(timeLeft)}</p>
          </div>

          {/* --- CHANGE: Tombol jadi PINK (Primary) --- */}
          <Button
            className="w-full h-11" // Hapus bg-emerald, biarkan default primary (Pink)
            onClick={handleCheckStatus}
          >
            Check Payment Status <RotateCw className="ml-2 h-4 w-4" />
          </Button>

          <p className="mt-4 text-xs text-muted-foreground">
            Having trouble?{" "}
            <span className="text-primary cursor-pointer hover:underline" onClick={() => setStep("method-selection")}>
              Use another method
            </span>
          </p>
        </div>
      );
    }
    // if (step === "qris-scan") {
    //   return (
    //     <div className="flex flex-col items-center py-2 animate-in fade-in zoom-in duration-300">
    //       <button onClick={() => setStep("method-selection")} className="absolute left-4 top-4 text-xs text-muted-foreground hover:text-foreground">
    //         &larr; Back
    //       </button>

    //       <h2 className="text-xl font-bold mb-1">Scan to Pay</h2>
    //       <div className="flex items-center gap-1 mb-6">
    //         <p className="text-sm text-muted-foreground">Pay with</p>
    //         <span className="font-bold text-red-600 text-sm italic">QRIS</span>
    //       </div>

    //       <div className="bg-orange-50 p-6 rounded-2xl mb-4 border border-orange-100 flex flex-col items-center">
    //         <div className="bg-white p-2 rounded-lg shadow-sm mb-3">
    //           <QrCode className="h-32 w-32 text-zinc-800" strokeWidth={1.5} />
    //         </div>
    //         <div className="bg-white px-3 py-1 rounded-full border border-zinc-100">
    //           <p className="text-[10px] font-mono text-zinc-500">ID: 8839-2023-PILATES</p>
    //         </div>
    //       </div>

    //       <div className="flex items-center gap-2 text-orange-600 bg-orange-50 px-3 py-1.5 rounded-full mb-6">
    //         <Timer className="h-4 w-4" />
    //         <p className="text-sm font-semibold">Valid for {formatTime(timeLeft)}</p>
    //       </div>

    //       <Button className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white" onClick={handleCheckStatus}>
    //         Check Payment Status <RotateCw className="ml-2 h-4 w-4" />
    //       </Button>

    //       <p className="mt-4 text-xs text-muted-foreground">
    //         Having trouble?{" "}
    //         <span className="text-primary cursor-pointer hover:underline" onClick={() => setStep("method-selection")}>
    //           Use another method
    //         </span>
    //       </p>
    //     </div>
    //   );
    // }

    // 4. PROCESSING
    if (step === "processing") {
      return (
        <div className="flex flex-col items-center justify-center py-12 animate-in fade-in duration-500">
          <svg className="animate-snake h-20 w-20" viewBox="0 0 50 50">
            <circle cx="25" cy="25" r="20"></circle>
          </svg>
          <h3 className="mt-6 text-lg font-semibold animate-pulse">Processing Payment...</h3>
          <p className="text-xs text-muted-foreground">Checking transaction status</p>
        </div>
      );
    }

    // 5. SUCCESS
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
          <div className="w-full space-y-3">
            <Link href="/dashboard" className="w-full block">
              <Button className="w-full h-11" onClick={onClose}>
                Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      );
    }

    // 6. FAILED
    if (step === "failed") {
      return (
        <div className="flex flex-col items-center py-4 animate-in slide-in-from-bottom-10 duration-500">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
            <X className="h-10 w-10 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Payment Failed</h2>
          <p className="text-center text-muted-foreground mt-2 mb-8 max-w-xs">Transaction timed out or failed. Please try again.</p>
          <div className="w-full space-y-3">
            <Button className="w-full h-11" onClick={handleRetry}>
              <RefreshCcw className="mr-2 h-4 w-4" /> Try Again / Select Method
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
        <DialogTitle className="sr-only">{step === "method-selection" ? "Select Payment" : step === "pin" ? "Verify Payment" : step === "processing" ? "Processing" : step === "success" ? "Payment Success" : "Payment Failed"}</DialogTitle>

        {renderContent()}
      </DialogContent>
    </Dialog>
  );
}

export default PaymentWizard;
