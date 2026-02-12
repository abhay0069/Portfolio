'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './style.module.css';
import Project from './Project';
import Modal from './Modal';

const projects = [
  { title: "Levare-Digital", src: "c2montreal.png", color: "#000000", url: "https://levare-digital.com/" },
  { title: "Animo Hub", src: "officestudio.png", color: "#8C8C8C" },
  { title: "Locomotive", src: "locomotive.png", color: "#EFE8D3" },
  { title: "Silencio", src: "silencio.png", color: "#706D63" }
];

export default function Gallery() {
  const [modal, setModal] = useState({ active: false, index: 0 });

  return (
    <div className={styles.gallery} id="projects">
      <div className="w-full flex flex-col items-center mb-16 px-4 pt-20">
        <div className="overflow-hidden mb-4">
          <motion.h2
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl font-sf font-bold tracking-tight text-metallic"
          >
            PROJECTS
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
          Selected Works
        </motion.p>
      </div>

      <div className={styles.body}>
        {projects.map((project, index) => (
          <Project index={index} title={project.title} setModal={setModal} key={index} url={project.url} />
        ))}
      </div>
      <Modal modal={modal} projects={projects} />
    </div>
  );
}
