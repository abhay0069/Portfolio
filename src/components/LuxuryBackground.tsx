"use client";

import { motion } from "framer-motion";

export default function LuxuryBackground() {
  return (
    <div className="absolute inset-0 z-0 bg-[#0A0A0A] overflow-hidden">
      {/* Optimized Organic Mesh Gradients */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -top-[10%] -left-[5%] w-[60%] h-[60%] rounded-full bg-blue-600/5 blur-[80px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -bottom-[10%] -right-[5%] w-[50%] h-[50%] rounded-full bg-purple-600/5 blur-[80px]"
      />
      <motion.div
        animate={{
          opacity: [0.05, 0.15, 0.05],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full bg-indigo-500/3 blur-[100px]"
      />

      {/* Simplified Cinematic Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

      {/* High-Performance Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#0A0A0A_100%)] opacity-40" />
    </div>
  );
}
