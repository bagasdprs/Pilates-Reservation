"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          role: "member",
          medical_conditions: [],
          notification_prefs: { marketing_emails: true },
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");
      router.push("/login");
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full overflow-hidden">
      {" "}
      {/* overflow-hidden PENTING biar gak ada scrollbar pas animasi */}
      {/* BAGIAN KIRI: FORM REGISTER */}
      {/* Logika: Datang dari Kanan (x: "100%") menuju diam (x: 0) */}
      <motion.div
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: "0%", opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, duration: 0.8 }}
        className="flex flex-col justify-center w-full lg:w-1/2 p-8 lg:p-16 bg-white overflow-y-auto z-20"
      >
        <div className="max-w-md w-full mx-auto">
          {/* ... KONTEN FORM SAMA KAYAK SEBELUMNYA ... */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Join Diro Pilates</h1>
            <p className="text-gray-500">Start your wellness journey with us today.</p>
          </div>

          {error && <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">{error}</div>}

          <form onSubmit={handleRegister} className="space-y-5">
            {/* ... INPUT FIELD DISINI COPY DARI KODINGAN LAMA ... */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input name="first_name" required onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-pink-500 outline-none" placeholder="Jane" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input name="last_name" required onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-pink-500 outline-none" placeholder="Doe" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input name="email" type="email" required onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-pink-500 outline-none" placeholder="jane@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input name="phone" type="tel" required onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-pink-500 outline-none" placeholder="0812..." />
            </div>
            <button type="submit" disabled={isLoading} className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-pink-200 flex justify-center items-center gap-2">
              {isLoading ? <Loader2 className="animate-spin" /> : "Create Account"}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500">
            Already a member?{" "}
            <Link href="/login" className="font-semibold text-pink-600 hover:text-pink-700">
              Log In
            </Link>
          </div>
        </div>
      </motion.div>
      {/* BAGIAN KANAN: GAMBAR */}
      {/* Logika: Datang dari Kiri (x: "-100%") menuju diam (x: 0) */}
      <motion.div
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: "0%", opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, duration: 0.8 }}
        className="hidden lg:flex w-1/2 bg-pink-50 relative items-center justify-center overflow-hidden z-10"
      >
        <div className="absolute inset-0 z-0" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=2069&auto=format&fit=crop')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 bg-pink-900/40 z-10" />
        <div className="relative z-20 p-12 text-white max-w-lg">
          <p className="text-2xl font-serif italic mb-4">&ldquo;Physical fitness is the first requisite of happiness.&rdquo;</p>
          <p className="font-semibold text-pink-100">— Joseph Pilates</p>
        </div>
      </motion.div>
    </div>
  );
}

export default RegisterPage;
