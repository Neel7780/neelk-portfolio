"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { Project } from "@/lib/notion"

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="bg-[#F5F5F5] py-24 md:py-32 px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-12 md:mb-16">
          <p className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-black/40 mb-2">Selected Work</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black">Projects</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {projects.map((project, index) => (
            <motion.a
              key={project.id}
              href={project.link}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="group relative bg-white border border-black/10 p-6 md:p-8 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <p key={tag} className="text-[10px] tracking-[0.15em] uppercase text-black/40 font-mono">
                    {tag}
                  </p>
                ))}
              </div>

              {/* Title with arrow */}
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="text-lg md:text-xl font-semibold text-black tracking-tight">{project.title}</h3>
                <ArrowUpRight
                  className="w-4 h-4 text-black/20 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1"
                  strokeWidth={1.5}
                />
              </div>

              {/* Description */}
              <p className="text-sm text-black/50 leading-relaxed">{project.description}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
