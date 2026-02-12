"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

const skills = [
  {
    title: "Frontend Alchemy",
    subtitle: "The Forge",
    description: "Synthesizing advanced logic with high-end digital aesthetics for world-class products.",
    items: ["Next.js 14", "React 18", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"]
  },
  {
    title: "Backend Architecture",
    subtitle: "The Engine",
    description: "Building robust, scalable foundations that power complex digital ecosystems.",
    items: ["Node.js", "Express", "Microservices", "PostgreSQL", "MongoDB", "RabbitMQ"]
  },
  {
    title: "Cloud & DevOps",
    subtitle: "The Orbit",
    description: "Ensuring seamless deployment and 99.9% uptime through modern infrastructure.",
    items: ["Docker", "Kubernetes", "AWS S3", "CI/CD Pipelines", "Nginx", "Redis"]
  },
  {
    title: "Visual Mastery",
    subtitle: "The Vision",
    description: "Creating immersive experiences that captivate and inspire users through design.",
    items: ["Figma", "Adobe Creative Cloud", "WebGL", "GSAP", "Lenis Scroll", "SVG Animation"]
  }
];

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Timeline dot position
  const dotY = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={containerRef}
      className="relative z-20 bg-[#050505] min-h-screen py-40 border-t border-white/5 font-sf"
      id="skills"
    >
      {/* Timeline Path at Section Level */}
      <div className="absolute left-[30px] md:left-[40%] top-0 bottom-0 w-40 -translate-x-1/2 hidden md:block z-20 pointer-events-none">
        <svg
          width="160"
          height="100%"
          viewBox="0 0 160 1000"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <defs>
            <filter id="glow-v3">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            // Mathematically generated wavy path (Sine wave)
            d={`M 80 0 ${Array.from({ length: 51 }).map((_, i) => {
              const y = i * 20;
              const x = 80 + Math.sin((y / 1000) * Math.PI * 3) * 50;
              return `L ${x} ${y}`;
            }).join(' ')}`}
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeOpacity="0.3"
            strokeDasharray="4 6"
            filter="url(#glow-v3)"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <motion.div
          style={{
            top: dotY,
            // Exactly synced Sine movement
            left: useTransform(smoothProgress, (p) => {
              const x = 80 + Math.sin(p * Math.PI * 3) * 50;
              return (x / 160) * 100 + "%";
            })
          }}
          className="absolute -translate-x-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_30px_white] z-30"
        />

        <motion.div
          style={{
            top: dotY,
            left: useTransform(smoothProgress, (p) => {
              const x = 80 + Math.sin(p * Math.PI * 3) * 50;
              return (x / 160) * 100 + "%";
            })
          }}
          animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0.1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -translate-x-1/2 w-10 h-10 bg-blue-500/20 rounded-full z-20"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-24">
        <div className="flex flex-col md:flex-row relative">

          {/* Left Column: Sticky Headline */}
          <div className="md:w-1/2 md:pr-10 mb-20 md:mb-0 md:-ml-24">
            <div className="md:sticky md:top-40">
              <span className="text-xs md:text-sm uppercase tracking-[0.8em] text-blue-500 font-bold mb-6 block">Capabilities</span>
              <h2 className="text-5xl md:text-8xl font-light text-metallic leading-tight mb-8 tracking-tight">
                Skills.
              </h2>
              <p className="text-metallic font-light tracking-wide text-lg md:text-xl max-w-sm leading-relaxed mb-10">
                Synthesizing advanced logic with high-end digital aesthetics for world-class products.
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white/5 border border-white/10 text-white text-[10px] tracking-[0.2em] uppercase rounded-full hover:bg-white/10 transition-all backdrop-blur-md relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-blue-500/10 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
                <span className="relative z-10">Download CV</span>
              </motion.button>
            </div>
          </div>

          {/* Right Column: Scrolling Content */}
          <div className="md:w-1/2 md:pl-72 mt-20 md:mt-0 flex flex-col gap-40 md:gap-72 pb-40">
            {skills.map((skill, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-20%" }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="relative group"
              >
                {/* Dot indicator for mobile */}
                <div className="absolute -left-[54px] md:hidden w-3 h-3 bg-white rounded-full top-2 shadow-[0_0_10px_rgba(255,255,255,0.5)]" />

                <span className="text-xs uppercase tracking-[0.5em] text-gray-500 mb-4 block">{skill.subtitle}</span>
                <h3 className="text-3xl md:text-5xl font-light text-metallic mb-6 tracking-tight group-hover:text-blue-400 transition-colors">
                  {skill.title}
                </h3>
                <p className="text-metallic font-light leading-relaxed text-lg mb-8 max-w-sm">
                  {skill.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item, itemIdx) => (
                    <span
                      key={itemIdx}
                      className="px-4 py-1.5 bg-white/5 border border-white/5 rounded-sm text-xs tracking-widest text-gray-500 uppercase group-hover:border-blue-500/30 group-hover:text-white transition-all duration-500"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      {/* Decorative Gradient Overlay */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-10" />
    </section>
  );
}
