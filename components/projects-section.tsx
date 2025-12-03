"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, Github } from "lucide-react"
import { Project } from "@/lib/notion"

interface ProjectsSectionProps {
  projects: Project[];
}

const TABS = ["All", "Dev", "Hardware", "College"];

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [activeTab, setActiveTab] = useState("All");

  const filteredProjects = projects.filter(project => 
    activeTab === "All" ? true : project.category === activeTab
  );

  return (
    <section id="projects" className="bg-[#F5F5F5] dark:bg-black py-24 md:py-32 px-6 md:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="mb-12 md:mb-16">
          <p className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-black/40 dark:text-white/40 mb-2">Selected Work</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black dark:text-white">Projects</h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === tab
                  ? "bg-black text-white dark:bg-white dark:text-black shadow-md"
                  : "bg-white text-black/60 hover:bg-black/5 hover:text-black dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
                className="group flex flex-col relative bg-white dark:bg-zinc-900 border border-black/10 dark:border-zinc-800 p-6 md:p-8 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 h-full"
              >
                {/* Category Badge */}
                <div className={`absolute top-6 right-6 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  project.category === 'Hardware' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                  project.category === 'Dev' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                  project.category === 'College' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' :
                  'bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:text-zinc-300'
                }`}>
                  {project.category}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4 pr-16">
                  {project.tags.map((tag) => (
                    <p key={tag} className="text-[10px] tracking-[0.15em] uppercase font-mono bg-gray-100 text-gray-800 dark:bg-zinc-800 dark:text-zinc-300 px-2 py-1 rounded">
                      {tag}
                    </p>
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-semibold text-black dark:text-gray-100 tracking-tight mb-3">{project.title}</h3>

                {/* Description */}
                <p className="text-sm text-black/50 dark:text-gray-400 leading-relaxed mb-6 grow">{project.description}</p>

                {/* Buttons */}
                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-black/5 dark:border-white/5">
                  {project.liveLink && (
                    <a 
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-black text-white dark:bg-white dark:text-black rounded-md hover:bg-black/80 dark:hover:bg-white/90 transition-colors"
                    >
                      Live Demo <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                  
                  {project.githubLink && (
                    <a 
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium border border-black/10 dark:border-white/10 text-black/70 dark:text-white/70 rounded-md hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" /> Code
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
