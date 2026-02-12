"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Testimonials from "@/components/Testimonials";
import Dock from "@/components/Dock";
import Contact from "@/components/Contact";
import Gallery from "@/components/Gallery";
import Preloader from "@/components/Preloader";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <main className="min-h-screen text-white">
      <Preloader onComplete={() => setLoadingComplete(true)} />
      <Hero loadingComplete={loadingComplete} />
      <Gallery />
      <Projects />
      <Skills />
      <Testimonials />
      <Contact />
      <AnimatePresence>
        {loadingComplete && <Dock />}
      </AnimatePresence>
    </main>
  );
}
