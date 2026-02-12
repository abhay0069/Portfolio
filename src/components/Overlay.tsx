"use client";

import { useTransform, motion, MotionValue } from "framer-motion";

export default function Overlay({ scrollYProgress, loadingComplete }: { scrollYProgress: MotionValue<number>, loadingComplete: boolean }) {
    // Section Opacity and Movement
    const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.25], [1, 1, 0]);
    const opacity2 = useTransform(scrollYProgress, [0.35, 0.45, 0.6, 0.7], [0, 1, 1, 0]);
    const opacity3 = useTransform(scrollYProgress, [0.75, 0.85, 1], [0, 1, 1]);

    const y1 = useTransform(scrollYProgress, [0, 0.25], [0, -30]);
    const x2 = useTransform(scrollYProgress, [0.35, 0.7], [50, -50]);
    const x3 = useTransform(scrollYProgress, [0.75, 1], [50, 0]);

    return (
        <div className="absolute inset-0 pointer-events-none z-10 flex flex-col text-white px-8 md:px-24 font-sf">
            {/* Editorial Section 1 - Intro */}
            <motion.div
                style={{ opacity: opacity1, y: y1 }}
                className="absolute inset-0 flex flex-col justify-center gap-6"
            >
                <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-blue-500/10 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2 -z-10" />
                <div className="flex flex-col gap-3">
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={loadingComplete ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                        className="text-8xl md:text-[14rem] font-medium leading-none ml-8 md:ml-10 tracking-[-0.03em] bg-gradient-to-b from-white via-gray-200 to-gray-600 bg-clip-text text-transparent"
                    >
                        Abhay
                    </motion.h1>
                </div>

                <div className="flex flex-col md:flex-row md:items-end gap-10 mt-6">
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={loadingComplete ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                        className="text-sm md:text-2xl font-light tracking-tight max-w-lg leading-relaxed uppercase pl-12 bg-gradient-to-b from-white via-gray-200 to-gray-600 bg-clip-text text-transparent"
                    >
                        Web Developer & <br /> Designer of Full-Stack Experiences.
                    </motion.p>
                </div>
            </motion.div>

            {/* Editorial Section 2 - Core Philosophy */}
            <motion.div
                style={{ opacity: opacity2, x: x2 }}
                className="absolute inset-0 flex flex-col items-end justify-center text-right"
            >
                <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-[#ff9f43]/5 blur-[120px] rounded-full -translate-x-1/2 -z-10" />
                <div className="max-w-2xl mr-4 md:mr-20">

                    <h2 className="text-6xl md:text-[10rem] font-medium leading-[0.9] mb-10 tracking-tight bg-gradient-to-b from-white via-gray-200 to-gray-600 bg-clip-text text-transparent">
                        Full-Stack <br />

                    </h2>

                    <p className="text-base md:text-xl font-light tracking-tight uppercase leading-relaxed max-w-md ml-auto bg-gradient-to-b from-white via-gray-200 to-gray-600 bg-clip-text text-transparent">
                        Building high-performance frontend and backend systems that scale. Robust architecture, minimalist design, maximal impact.
                    </p>
                </div>
            </motion.div>

            {/* Editorial Section 3 - Tech Stack */}
            <motion.div
                style={{ opacity: opacity3, x: x3 }}
                className="absolute inset-0 flex flex-col justify-center"
            >
                <div className="absolute bottom-0 left-0 w-[800px] h-[600px] bg-blue-900/10 blur-[150px] rounded-full -translat-x-1/2 -z-10" />
                <div className="max-w-3xl ml-4 md:ml-20">

                    <h2 className="text-6xl md:text-[10rem] font-medium leading-[0.9] mb-10 tracking-tight bg-gradient-to-b from-white via-gray-200 to-gray-600 bg-clip-text text-transparent">
                        Modern <br />
                        Alchemy.
                    </h2>
                    <p className="text-base md:text-xl font-light tracking-tight uppercase leading-relaxed max-w-md bg-gradient-to-b from-white via-gray-200 to-gray-600 bg-clip-text text-transparent">
                        Mastering Next.js, Backend Infrastructure, and advanced UI paradigms to craft polished, prestigious digital products.
                    </p>
                </div>

                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-auto">
                    <motion.a
                        href="#contact"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={loadingComplete ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="group relative px-12 py-5 overflow-hidden rounded-full border border-white/10 bg-black/20 backdrop-blur-xl hover:border-blue-500/50"
                    >
                        <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                        <span className="relative z-10 text-[10px] uppercase font-bold tracking-[0.6em] text-white group-hover:text-black transition-colors duration-500">
                            Secure the Vision
                        </span>

                        {/* Crazy Glow Effect */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                            <div className="absolute inset-[-20px] bg-blue-500/10 blur-[30px] rounded-full animate-pulse" />
                        </div>
                    </motion.a>

                    {/* Scroll Indicator - Chevrons */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={loadingComplete ? { opacity: 1 } : {}}
                        transition={{ delay: 1.5, duration: 1 }}
                        className="mt-12 flex flex-col items-center gap-1"
                    >
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="w-4 h-4 border-b-2 border-r-2 border-white/40 rotate-45 transform origin-center"
                                animate={{
                                    opacity: [0.2, 1, 0.2],
                                    y: [0, 5, 0],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                    ease: "easeInOut",
                                }}
                            />
                        ))}
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
