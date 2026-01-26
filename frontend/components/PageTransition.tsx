"use client";

import React from "react";
import { motion } from "framer-motion";

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    // Version 1
    // <motion.div
    //   initial={{ opacity: 0, y: 20, filter: "blur(10px)" }} // Awal: Transparan, turun dikit, agak blur
    //   animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} // Akhir: Muncul, posisi normal, jelas
    //   transition={{ duration: 0.4, ease: "easeOut" }} // Durasi: 0.4 detik (pas, gak lambat gak cepet)
    //   className="w-full min-h-screen" // Pastikan full width
    // >
    //   {children}
    // </motion.div>

    // Version 2
    // <motion.div
    //   initial={{ scale: 0.9, opacity: 0, filter: "blur(10px)" }} // Mulai: Agak kecil & blur
    //   animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }} // Akhir: Ukuran normal & jelas
    //   transition={{
    //     type: "spring", // Pakai fisika pegas
    //     stiffness: 260, // Kekakuan (makin tinggi makin ngebut)
    //     damping: 20, // Pengereman (biar gak goyang banget)
    //   }}
    //   className="w-full min-h-screen"
    // >
    //   {children}
    // </motion.div>

    // Version 3
    // <motion.div
    //   initial={{ x: 100, opacity: 0 }} // Mulai: Dari kanan 100px
    //   animate={{ x: 0, opacity: 1 }} // Akhir: Ke tengah (0)
    //   transition={{
    //     type: "spring",
    //     stiffness: 100,
    //     damping: 20,
    //   }}
    //   className="w-full min-h-screen"
    // >
    //   {children}
    // </motion.div>

    // Version 4
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        bounce: 0.5, // <--- Ini kuncinya! Angka 0-1. Makin gede makin membal.
        duration: 0.8,
      }}
      className="w-full min-h-screen"
    >
      {children}
    </motion.div>
  );
}

export default PageTransition;
