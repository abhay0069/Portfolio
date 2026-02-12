'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './page.module.scss'
import Image from 'next/image';

import { useTransform, useScroll, motion, MotionValue } from 'framer-motion';

const images = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
  "9.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
]

export default function Home() {

  const gallery = useRef(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });


  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ['start end', 'end start']
  })
  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25])
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3])

  useEffect(() => {
    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener("resize", resize)
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    }
  }, [])

  return (
    <section className="relative bg-[#121212] pb-20 pt-12" id="gallery">
      <div className="w-full flex flex-col items-center mb-10 px-4 pt-0">
        <div className="overflow-hidden mb-4">
          <motion.h2
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl font-sf font-bold tracking-tight uppercase text-metallic"
          >
            Gallery
          </motion.h2>
        </div>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="w-20 h-[1px] bg-blue-500 mb-6"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.4 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-xs uppercase font-medium tracking-[0.5em] text-metallic"
        >
          Visual Collection
        </motion.p>
      </div>

      <div ref={gallery} className={styles.gallery}>
        <Column images={[images[0], images[1], images[2]]} y={y} />
        <Column images={[images[3], images[4], images[5]]} y={y2} />
        <Column images={[images[6], images[7], images[8]]} y={y3} />
        <Column images={[images[9], images[10], images[11]]} y={y4} />
      </div>

    </section>
  )
}

const Column = ({ images, y }: { images: string[], y: MotionValue<number> }) => {
  return (
    <motion.div
      className={styles.column}
      style={{ y }}
    >
      {
        images.map((src, i) => {
          return <div key={i} className={styles.imageContainer}>
            <Image
              src={`/images/${src}`}
              alt='image'
              fill
            />
          </div>
        })
      }
    </motion.div>
  )
}
