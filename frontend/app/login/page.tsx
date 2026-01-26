"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const animationSettings = {
  transition: { type: "spring" as const, stiffness: 100, damping: 20, duration: 0.8 },
};

function LoginPage() {
  const router = useRouter();

  // State Management
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Simpan data & Redirect
      localStorage.setItem("user_id", data.data.id);
      localStorage.setItem("user_data", JSON.stringify(data.data));
      router.push("/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full overflow-hidden">
      {/* IMAGE */}
      <motion.div initial={{ x: "100%", opacity: 0 }} animate={{ x: "0%", opacity: 1 }} transition={animationSettings.transition} className="hidden lg:flex w-1/2 bg-gray-900 relative items-center justify-center overflow-hidden z-10">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0 opacity-60"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Gradient Overlay (Fix: bg-gradient-to-t) */}
        <div className="absolute inset-0 bg-linear-to-t from-pink-900/80 to-transparent z-10" />

        {/* Text Content */}
        <div className="relative z-20 p-12 text-white">
          <h2 className="text-4xl font-bold mb-4">Balance your body and mind.</h2>
          <p className="text-lg text-gray-200">Experience the transformation in our modern pilates studio.</p>
        </div>
      </motion.div>

      {/* FORM LOGIN */}
      <motion.div initial={{ x: "-100%", opacity: 0 }} animate={{ x: "0%", opacity: 1 }} transition={animationSettings.transition} className="flex flex-col justify-center w-full lg:w-1/2 p-8 lg:p-24 bg-white z-20">
        <div className="max-w-md w-full mx-auto">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-500">Please enter your email to sign in.</p>
          </div>

          {/* Error Alert */}
          {error && <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">{error}</div>}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ex: diro@dummy.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all outline-none text-gray-800"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-pink-200 disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Signing In...
                </>
              ) : (
                <>
                  Sign In <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-8 text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-semibold text-pink-600 hover:text-pink-700">
              Sign up
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default LoginPage;
