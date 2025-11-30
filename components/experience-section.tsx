"use client"

import { motion } from "framer-motion"
import { Experience } from "@/lib/notion"

interface ExperienceSectionProps {
  experience: Experience[];
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <section id="experience" className="bg-white py-24 md:py-32 px-6 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="mb-12 md:mb-16">
          <p className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-black/40 mb-2">Background</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black">Experience</h2>
        </div>

        {/* Experience list with horizontal dividers (Swiss Style) */}
        <div className="space-y-0">
          {experience.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="border-t border-black/10 py-8 md:py-10"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
                {/* Left column: Role & Org */}
                <div className="md:col-span-5">
                  <h3 className="text-lg md:text-xl font-semibold text-black tracking-tight mb-1">{exp.role}</h3>
                  <p className="text-sm text-black/50">{exp.org}</p>
                </div>

                {/* Middle column: Date */}
                <div className="md:col-span-2">
                  <p className="text-xs tracking-widest uppercase text-black/40 font-mono">{exp.date}</p>
                </div>

                {/* Right column: Description */}
                <div className="md:col-span-5">
                  <p className="text-sm md:text-base text-black/60 leading-relaxed">{exp.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
          {/* Final border */}
          <div className="border-t border-black/10" />
        </div>
      </div>
    </section>
  )
}
