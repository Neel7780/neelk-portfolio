"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail } from "lucide-react"

export function ContactSection() {
  const email = "neelkhatri7780@gmail.com"

  return (
    <section id="contact" className="bg-[#0A0A0A] dark:bg-zinc-950 py-32 md:py-40 lg:py-48 px-6 md:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm md:text-base text-white/40 mb-6">Have an idea?</p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-12 leading-[1.1]">
            Let's Build It.
          </h2>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center justify-center gap-6"
        >
          <a
            href="https://github.com/Neel7780"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/30 hover:text-white transition-colors p-2"
            aria-label="GitHub"
          >
            <Github className="w-6 h-6" strokeWidth={1.5} />
          </a>
          <a
            href="https://www.linkedin.com/in/neel-khatri-aa1618242/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/30 hover:text-white transition-colors p-2"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-6 h-6" strokeWidth={1.5} />
          </a>
          <a
            href={`mailto:${email}`}
            className="text-white/30 hover:text-white transition-colors p-2"
            aria-label="Email"
          >
            <Mail className="w-6 h-6" strokeWidth={1.5} />
          </a>
        </motion.div>

        {/* Footer text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-20 text-[10px] text-white/20 dark:text-white/20 tracking-[0.15em] uppercase"
        >
          Designed & Built by Neel Khatri © 2025
        </motion.p>
      </div>
    </section>
  )
}
