"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Github } from "lucide-react"
import { Project } from "@/lib/notion"

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="bg-[#F5F5F5] py-24 md:py-32 px-6 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="mb-12 md:mb-16">
          <p className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-black/40 mb-2">Selected Work</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black">Projects</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="group flex flex-col relative bg-white border border-black/10 p-6 md:p-8 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 h-full"
            >
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <p key={tag} className="text-[10px] tracking-[0.15em] uppercase text-black/40 font-mono">
                    {tag}
                  </p>
                ))}
              </div>

              {/* Title */}
              <h3 className="text-lg md:text-xl font-semibold text-black tracking-tight mb-3">{project.title}</h3>

              {/* Description */}
              <p className="text-sm text-black/50 leading-relaxed mb-6 grow">{project.description}</p>

              {/* Buttons */}
              <div className="flex items-center gap-4 mt-auto pt-4 border-t border-black/5">
                {project.liveLink && project.liveLink !== "#" && (
                  <a 
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-black text-white rounded-md hover:bg-black/80 transition-colors"
                  >
                    Live Demo <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
                
                {project.githubLink && project.githubLink !== "#" && (
                  <a 
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium border border-black/10 text-black/70 rounded-md hover:bg-black/5 hover:text-black transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" /> Code
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
