"use client";

import { useScroll } from "framer-motion";
import { useRef } from "react";
import FloatingCrystal from "@/components/FloatingCrystal";
import Overlay from "@/components/Overlay";

export default function Hero({ loadingComplete }: { loadingComplete: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-[#050505]" id="home">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <FloatingCrystal scrollYProgress={scrollYProgress} />
        <Overlay scrollYProgress={scrollYProgress} loadingComplete={loadingComplete} />
      </div>
    </div>
  );
}
