"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CalendarHeart, Activity, BellRing, CheckCircle2, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

// --- ANIMATION VARIANTS  ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const floatingAnimation = {
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
};

function LandingPage() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* ================= NAVBAR (Sticky) ================= */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-pink-400 bg-clip-text text-transparent">Diro Pilates</span>
          </div>
          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-semibold text-gray-600 hover:text-pink-600 transition-colors hidden sm:block">
              Sign In
            </Link>
            <Link href="/register" className="bg-pink-600 hover:bg-pink-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all shadow-md shadow-pink-200">
              Join Now
            </Link>
          </div>
        </div>
      </header>

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-16 pb-24 lg:pt-24 lg:pb-32 overflow-hidden">
        {/* Background Blob (Hiasan Pink Samar) */}
        <div className="absolute top-0 right-0 -z-10 translate-x-1/3 -translate-y-1/4 transform opacity-30">
          <div className="h-[500px] w-[500px] rounded-full bg-gradient-to-br from-pink-300 to-purple-200 blur-3xl filter" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content (Text) - Pakai Stagger Animation */}
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="max-w-2xl">
              <motion.div variants={fadeInUp}>
                <span className="inline-block py-1 px-3 rounded-full bg-pink-100 text-pink-600 text-sm font-semibold mb-4">The #1 Platform for Wellness</span>
              </motion.div>
              <motion.h1 variants={fadeInUp} className="text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
                Elevate Your <br />
                <span className="text-pink-600">Body & Mind.</span>
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-xl text-gray-500 mb-8 leading-relaxed">
                Experience seamless booking, track your health progress, and stay consistent with our modern Pilates studio companion app.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                <Link href="/register" className="flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 text-white font-bold px-8 py-4 rounded-full transition-all shadow-lg shadow-pink-200 text-lg">
                  Start Your Journey <ArrowRight className="w-5 h-5" />
                </Link>
                <button className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold px-8 py-4 rounded-full border-2 border-gray-200 transition-all text-lg">
                  <PlayCircle className="w-5 h-5 text-pink-600" /> Watch Demo
                </button>
              </motion.div>
            </motion.div>

            {/* Right Content (Image) - Floating Animation */}
            <motion.div variants={floatingAnimation} animate="animate" className="relative hidden lg:block">
              {/* Gambar Utama dengan Shadow Tebal */}
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl shadow-pink-900/20 border-4 border-white">
                <Image src="https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop" alt="Woman doing Pilates" className="w-full h-auto object-cover" width={500} height={500} />
              </div>

              {/* Floating Small Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-20 flex items-center gap-3 border border-gray-50"
              >
                <div className="bg-pink-100 p-2 rounded-full">
                  <Activity className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Current Heart Rate</p>
                  <p className="text-lg font-bold text-gray-900">112 bpm</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES SECTION (Grid) ================= */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeInUp} className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Studio Management <span className="text-pink-600">Made Simple</span>
            </h2>
            <p className="text-lg text-gray-500">Everything you need to focus on your practice, without the administrative headache.</p>
          </motion.div>

          {/* Grid Cards  */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Booking */}
            <motion.div variants={fadeInUp} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center mb-6">
                <CalendarHeart className="w-7 h-7 text-pink-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Real-time Availability</h3>
              <p className="text-gray-500 leading-relaxed">Instant booking updates for all classes. Never double-book again with our synchronized calendar engine.</p>
            </motion.div>

            {/* Card 2: Health Tracking */}
            <motion.div variants={fadeInUp} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center mb-6">
                <Activity className="w-7 h-7 text-pink-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Health Tracking</h3>
              <p className="text-gray-500 leading-relaxed">Visualize your progress with vibrant data charts. Keep motivation high with tangible results.</p>
            </motion.div>

            {/* Card 3: Reminders */}
            <motion.div variants={fadeInUp} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center mb-6">
                <BellRing className="w-7 h-7 text-pink-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Automated Reminders</h3>
              <p className="text-gray-500 leading-relaxed">Reduce no-shows with smart notifications via Email. Keep your schedule full effortlessly.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= DARK MODE SECTION (Focus Feature) ================= */}
      <section className="py-24 bg-gray-900 text-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text */}
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              <h2 className="text-4xl font-bold mb-6 leading-tight">
                Designed for <span className="text-pink-500">Efficiency</span>,<br />
                Built for <span className="text-pink-300">Beauty</span>.
              </h2>
              <p className="text-lg text-gray-300 mb-8">Our dashboard gives you a birds-eye view of your performance and schedule. It is not just about booking; it is about understanding your body.</p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-pink-500" />
                  <span className="font-medium">Track medical conditions & progress</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-pink-500" />
                  <span className="font-medium">Personalized class recommendations</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-pink-500" />
                  <span className="font-medium">Mobile-optimized experience</span>
                </li>
              </ul>
            </motion.div>

            {/* Right: Image/Mockup */}
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }} className="relative">
              {/* Dark Placeholder Mockup Dashboard */}
              <Image src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" alt="Dashboard Mockup" className="rounded-3xl shadow-2xl border border-gray-800 w-full h-auto" width={500} height={500} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION (Big Pink Box) ================= */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-gradient-to-br from-pink-600 to-pink-500 rounded-[3rem] p-12 lg:p-20 text-center text-white shadow-2xl shadow-pink-300/50 relative overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>

            <h2 className="text-4xl lg:text-5xl font-bold mb-6 relative z-10">Ready to elevate your studio experience?</h2>
            <p className="text-xl text-pink-100 mb-10 max-w-2xl mx-auto relative z-10">Join thousands of wellness enthusiasts who have streamlined their journey with our platform.</p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block relative z-10">
              <Link href="/register" className="bg-white text-pink-600 hover:bg-gray-50 font-bold px-10 py-4 rounded-full transition-all shadow-md text-lg flex items-center gap-2">
                Get Started For Free <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-50 pt-16 pb-8 border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Kolom 1: Brand & Social */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                {/* Logo Icon Kecil */}
                <div className="w-8 h-8 bg-pink-600 rounded-lg flex items-center justify-center">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">Diro Pilates</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">Empowering wellness studios with elegant technology. Designed with love for movement and mindfulness.</p>
              <div className="flex gap-4 pt-2">
                {/* Social Icons (Dummy) */}
                <div className="w-8 h-8 rounded-full bg-gray-200 hover:bg-pink-100 hover:text-pink-600 flex items-center justify-center transition-colors cursor-pointer">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-200 hover:bg-pink-100 hover:text-pink-600 flex items-center justify-center transition-colors cursor-pointer">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Kolom 2: Product */}
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Product</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li>
                  <a href="#" className="hover:text-pink-600 transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-pink-600 transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-pink-600 transition-colors">
                    Integrations
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-pink-600 transition-colors">
                    Changelog
                  </a>
                </li>
              </ul>
            </div>

            {/* Kolom 3: Company */}
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li>
                  <a href="#" className="hover:text-pink-600 transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-pink-600 transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-pink-600 transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-pink-600 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Kolom 4: Legal */}
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li>
                  <a href="#" className="hover:text-pink-600 transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-pink-600 transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-pink-600 transition-colors">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bagian Bawah: Copyright + Status System */}
          <div className="border-t border-gray-200 pt-8 flex justify-center items-center">
            <p className="text-sm text-gray-400">© 2026 Diro Pilates SaaS Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default LandingPage;
