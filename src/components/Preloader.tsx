"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(onComplete, 1000);
    }, 2500); // Slightly faster overall time

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(40px)" }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >

          <div className="absolute inset-0 z-50 flex items-center justify-center">
            {/* Logo Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-4"
            >
              {/* Graphic Icon "W" */}
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7c3aed" /> {/* Violet */}
                    <stop offset="100%" stopColor="#db2777" /> {/* Pink */}
                  </linearGradient>
                  <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#db2777" /> {/* Pink */}
                    <stop offset="100%" stopColor="#2563eb" /> {/* Blue */}
                  </linearGradient>
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Left stroke of W */}
                <motion.path
                  d="M10 15 L20 45 L30 25"
                  stroke="url(#grad1)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  filter="url(#glow)"
                />

                {/* Right stroke of W */}
                <motion.path
                  d="M30 25 L40 45 L50 15"
                  stroke="url(#grad2)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                  filter="url(#glow)"
                />
              </svg>

              {/* Text "WEBKNOX" */}
              <motion.div
                className="flex flex-col"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 1, ease: "easeOut" }}
              >
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black tracking-tighter text-white font-sf">
                    WEBKNOX
                  </span>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.5, type: "spring" }}
                    className="w-2 h-2 rounded-full bg-blue-500"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
