"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const TESTIMONIALS = [
  {
    quote: "His technical expertise brought our creative vision to life in ways we didn't think possible. The platform is not only visually stunning but also incredibly fast and responsive. We are absolutely thrilled with the final result.",
    name: "Ayush Gupta",
    role: "Founder, Animo Hub Studio",
    image: "/images/x.jpeg"
  },
  {
    quote: "The site's architecture is robust, handling our traffic spikes with ease. His dedication to perfection and seamless code delivery exceeded all our expectations. We couldn't be happier with the outcome.",
    name: "Sarah Chen",
    role: "Founder, Leavre Digital",
    image: "/images/y.jpeg"
  },
];

export default function Testimonials() {
  return (
    <section className="relative z-20 bg-[#050505] py-40 px-6 md:px-24 overflow-hidden border-t border-white/5 font-sf" id="testimonials">
      <div className="absolute top-40 left-[-5%] text-[15rem] font-black text-white/[0.02] select-none pointer-events-none uppercase">
        Testimonials
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-32 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-2xl"
          >
            <h2 className="text-6xl md:text-9xl font-light text-white leading-none tracking-tight flex overflow-hidden">
              {"Testimonial.".split("").map((char, i) => (
                <motion.span
                  key={i}
                  animate={{
                    y: [0, -15, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.1,
                  }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </h2>
          </motion.div>


        </div>

        <div className="space-y-32">
          {TESTIMONIALS.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className={`flex ${index % 2 === 0 ? "justify-start" : "justify-end"} w-full`}
            >
              <div className={`max-w-9xl flex flex-col md:flex-row gap-16 items-center ${index % 2 === 0 ? "justify-end" : "md:flex-row-reverse"}`}>
                {/* Text Content */}
                <div className={`flex flex-col ${index % 2 === 0 ? "text-right" : "text-left"} max-w-xl`}>
                  <p className="text-lg md:text-4xl font-light text-metallic leading-tight mb-6 tracking-tight italic">
                    &quot;{item.quote}&quot;
                  </p>

                  <div className={`flex flex-col ${index % 2 === 0 ? "items-end" : "items-start"}`}>
                    <h4 className="text-sm font-medium tracking-[0.2em] text-white uppercase mb-1">
                      {item.name}
                    </h4>
                    <span className="text-[9px] tracking-[0.2em] text-blue-500 uppercase font-bold">
                      {item.role}
                    </span>
                  </div>
                </div>

                {/* Profile Image - Bigger and Wider */}
                <div className="shrink-0">
                  <div
                    className="relative w-full md:w-[800px] h-64 md:h-[500px] rounded-3xl overflow-hidden border-2 border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.1)] bg-white/5"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 800px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>


    </section>
  );
}
