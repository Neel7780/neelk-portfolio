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
    <section id="about" className="bg-white dark:bg-black py-24 md:py-32 px-6 md:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="mb-12 md:mb-16">
          <p className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-black/40 dark:text-white/40 mb-2">Background</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black dark:text-white">About Me</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: About text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xl md:text-2xl lg:text-3xl text-black/70 dark:text-gray-300 leading-relaxed font-light">
              I love creating UI with AI and I vibe to music and code ;) I can build scalable full-stack web applications using MERN stack and Next.js. DevOps and GenAI are on my bucket list!
            </p>
          </motion.div>

          {/* Right: Tech stack badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <p className="text-xs tracking-[0.15em] uppercase text-black/50 dark:text-white/50 mb-6 font-medium">Tech Stack</p>
            <div className="flex flex-wrap gap-3">
              {techStack.map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.05, duration: 0.3 }}
                  className="px-4 py-2 text-xs md:text-sm font-mono tracking-wide bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 text-gray-800 dark:text-gray-200 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors cursor-default"
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
