"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type TimelineItemType = {
  year: string;
  title: string;
  org: string;
  description: string;
  type: string;
};

const TIMELINE_DATA: TimelineItemType[] = [
  {
    year: "2024 — Present",
    title: "Full Stack Architect",
    org: "Freelance & Open Source",
    description: "Architecting high-performance digital solutions with an emphasis on scalability and refined user experiences. Specializing in Next.js and Cloud Infrastructure.",
    type: "work",
  },
  {
    year: "2023",
    title: "Technical Awakening",
    org: "Self-Directed Mastery",
    description: "Pivoted from Commerce to Engineering. Dedicated thousands of hours to mastering the MERN stack and software architecture fundamentals.",
    type: "milestone",
  },
  {
    year: "2020 — 2023",
    title: "Academic Foundation",
    org: "Calicut University",
    description: "Graduated with a focus on analytical thinking and business logic, providing a unique strategic perspective to software development.",
    type: "education",
  },
  {
    year: "2018 — 2020",
    title: "Conceptual Genesis",
    org: "GHSS Tirurangadi",
    description: "Initial exposure to computational logic and programming, sparking a lifelong fascination with digital creation.",
    type: "education",
  },
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const pathHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative z-20 bg-[#050505] min-h-screen py-40 px-6 md:px-24 overflow-hidden border-t border-white/5 font-sf" id="journey">
      <div className="absolute top-40 right-[-5%] text-[15rem] font-black text-white/[0.02] select-none pointer-events-none uppercase">
        Heritage
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-40 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-2xl"
          >
            <span className="text-[10px] uppercase tracking-[0.8em] text-blue-500 font-bold mb-6 block">Legacy</span>
            <h2 className="text-6xl md:text-9xl font-light text-white leading-none tracking-tight">
              Professional <br /> <span className="pl-12 md:pl-24">Path.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-right"
          >
            <div className="w-16 h-[1px] bg-white/20 ml-auto mb-6" />
            <p className="text-gray-500 font-light tracking-[0.2em] uppercase text-xs max-w-xs leading-loose">
              A curated timeline of technical evolution and architectural growth.
            </p>
          </motion.div>
        </div>

        <div ref={containerRef} className="relative max-w-5xl mx-auto">
          {/* Central Vertical Path */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/5 transform md:-translate-x-1/2" />
          <motion.div
            style={{ height: pathHeight }}
            className="absolute left-0 md:left-1/2 top-0 w-[1px] bg-blue-500/50 transform md:-translate-x-1/2 origin-top"
          />

          <div className="space-y-40">
            {TIMELINE_DATA.map((item, index) => (
              <TimelineItem key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ item, index }: { item: TimelineItemType; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, delay: index * 0.1 }}
      className={`relative flex items-center ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
    >
      <div className="hidden md:block w-1/2" />

      {/* Point on Line */}
      <div className="absolute left-0 md:left-1/2 w-2 h-2 bg-[#050505] border border-blue-500/50 rounded-full transform -translate-x-1/2 z-10 group cursor-crosshair">
        <div className="absolute inset-[-4px] bg-blue-500/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
      </div>

      <div className={`w-full md:w-1/2 pl-10 md:pl-0 ${isEven ? "md:pr-24 md:text-right" : "md:pl-24 md:text-left"}`}>
        <div className="group">
          <span className="text-[10px] text-blue-500 tracking-[0.4em] uppercase mb-4 block font-bold">
            {item.year}
          </span>
          <h3 className="text-3xl md:text-5xl font-medium text-white mb-4 transition-all duration-700 tracking-tight">
            {item.title}
          </h3>
          <p className="text-xs text-gray-600 uppercase tracking-[0.3em] mb-6 font-bold">
            {item.org}
          </p>
          <p className="text-gray-500 text-sm font-light leading-relaxed max-w-sm ml-auto mr-auto md:ml-0 md:mr-0 inline-block tracking-tight">
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
