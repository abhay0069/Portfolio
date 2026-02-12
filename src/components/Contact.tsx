"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Eye tracking state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Calculate eye movement
  const calculateEyePosition = (eyeOffset: { x: number, y: number }) => {
    if (!containerRef.current) return { x: 0, y: 0 };

    // Approximate eye positions relative to container
    const eyeX = eyeOffset.x;
    const eyeY = eyeOffset.y;

    const deltaX = mousePos.x - eyeX;
    const deltaY = mousePos.y - eyeY;

    const angle = Math.atan2(deltaY, deltaX);
    const distance = Math.min(10, Math.hypot(deltaX, deltaY) / 10);

    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance
    };
  };

  const leftEyePos = calculateEyePosition({ x: 200, y: 300 }); // Approximate center of left eye
  const rightEyePos = calculateEyePosition({ x: 400, y: 300 }); // Approximate center of right eye


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate a premium delay
    setTimeout(() => {
      setIsSuccess(true);
      setIsSubmitting(false);
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1500);
  };

  return (
    <section
      ref={containerRef}
      className="relative z-20 bg-black pt-52 pb-40 px-6 md:px-24 overflow-hidden font-sf text-black mt-24"
      id="contact"
    >
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Interactive Headline */}
        <div className="flex flex-col items-center mb-24 relative z-20 -mt-48">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white flex flex-wrap justify-center gap-x-3">
            {"Connect with us".split("").map((letter, index) => (
              <motion.span
                key={index}
                className="inline-block cursor-pointer hover:text-[#ff9f43] transition-colors duration-200"
                whileHover={{
                  rotate: [0, -10, 10, -10, 10, 0],
                  scale: 1.1,
                  y: -5
                }}
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </h2>
          <div className="w-24 h-1 bg-[#ff9f43] mt-8 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Interactive Face Column */}
          <div className="h-[500px] flex items-center justify-center relative">
            <div className="relative w-96 h-96 bg-[#ff9f43] rounded-full border-4 border-black shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center transition-transform hover:scale-105 duration-300">
              {/* Eyes Container */}
              <div className="flex gap-16 mb-12">
                {/* Left Eye */}
                <div className="w-24 h-24 bg-white rounded-full border-4 border-black relative overflow-hidden">
                  <motion.div
                    className="w-8 h-8 bg-black rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    animate={{ x: leftEyePos.x * 3, y: leftEyePos.y * 3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  />
                </div>
                {/* Right Eye */}
                <div className="w-24 h-24 bg-white rounded-full border-4 border-black relative overflow-hidden">
                  <motion.div
                    className="w-8 h-8 bg-black rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    animate={{ x: rightEyePos.x * 3, y: rightEyePos.y * 3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  />
                </div>
              </div>

              {/* Mouth */}
              <motion.div
                className="w-32 h-16 border-b-8 border-black rounded-b-full"
                animate={{
                  height: isTyping ? 60 : 16,
                  rotate: isTyping ? -5 : 0,
                  scale: isTyping ? 1.1 : 1
                }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              />
            </div>

            {/* Speech Bubble */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: isTyping ? 1 : 0, scale: isTyping ? 1 : 0 }}
              className="absolute top-0 right-10 bg-black text-white px-6 py-3 rounded-2xl rounded-bl-sm font-bold text-lg"
            >
              I'm listening!
            </motion.div>
          </div>

          {/* Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="bg-gray-50 p-12 rounded-3xl border-2 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,0.1)]"
          >
            <div className="mb-10">
              <h2 className="text-4xl font-black uppercase mb-4 tracking-tighter">Say Hello!</h2>
              <p className="text-gray-600 font-medium">Let's create something extraordinary together.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="group">
                <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">Name</label>
                <input
                  type="text"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  onFocus={() => setIsTyping(true)}
                  onBlur={() => setIsTyping(false)}
                  className="w-full bg-white border-2 border-gray-200 p-4 rounded-xl text-black font-bold focus:border-black focus:outline-none transition-all placeholder:text-gray-300"
                  placeholder="Your Name"
                  required
                />
              </div>

              <div className="group">
                <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">Email</label>
                <input
                  type="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  onFocus={() => setIsTyping(true)}
                  onBlur={() => setIsTyping(false)}
                  className="w-full bg-white border-2 border-gray-200 p-4 rounded-xl text-black font-bold focus:border-black focus:outline-none transition-all placeholder:text-gray-300"
                  placeholder="hello@example.com"
                  required
                />
              </div>

              <div className="group">
                <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">Message</label>
                <textarea
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  onFocus={() => setIsTyping(true)}
                  onBlur={() => setIsTyping(false)}
                  rows={4}
                  className="w-full bg-white border-2 border-gray-200 p-4 rounded-xl text-black font-bold focus:border-black focus:outline-none transition-all placeholder:text-gray-300 resize-none"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white py-5 rounded-xl font-black uppercase tracking-widest hover:bg-[#ff9f43] hover:text-black transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl translate-y-0 hover:-translate-y-1 active:translate-y-0"
              >
                {isSubmitting ? "Sending..." : isSuccess ? "Message Sent!" : "Send Message"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
