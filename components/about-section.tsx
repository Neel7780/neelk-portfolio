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
    <section id="about" className="bg-[#F5F5F5] py-24 md:py-32 px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-12 md:mb-16">
          <p className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-black/50 mb-2">Background</p>
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
            <p className="text-base md:text-lg text-black/70 leading-relaxed mb-6">
              I'm a 2nd year Computer Science student with a passion for building efficient, scalable software. My
              journey started with competitive programming in C++, which taught me the fundamentals of algorithms and
              data structures.
            </p>
            <p className="text-base md:text-lg text-black/70 leading-relaxed mb-6">
              Today, I focus on full-stack web development, combining my problem-solving skills with modern frameworks
              to create exceptional user experiences. I'm particularly interested in open source projects and
              contributing to developer tools.
            </p>
            <p className="text-base md:text-lg text-black/70 leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies, reading about system design, or mentoring
              fellow students in programming fundamentals.
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
