"use client"

import { motion } from "framer-motion"

const techStack = [
  "C++",
  "Python",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "MongoDB",
  "SQL",
  "Git",
  "Tailwind CSS",
  "Framer Motion",
]

export function AboutSection() {
  return (
    <section id="about" className="bg-white py-24 md:py-32 px-6 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="mb-12 md:mb-16">
          <p className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-black/40 mb-2">Background</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black">About Me</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: About text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xl md:text-2xl lg:text-3xl text-black/70 leading-relaxed font-light">
              I bridge the gap between systems programming (C++) and modern web development (Next.js). My focus is on
              building scalable, high-performance applications that solve real problems.
            </p>
          </motion.div>

          {/* Right: Tech stack badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <p className="text-xs tracking-[0.15em] uppercase text-black/50 mb-6 font-medium">Tech Stack</p>
            <div className="flex flex-wrap gap-3">
              {techStack.map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.05, duration: 0.3 }}
                  className="px-4 py-2 text-xs md:text-sm font-mono tracking-wide bg-white border border-black/10 text-black/70 hover:bg-black hover:text-white transition-colors cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
