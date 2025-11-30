"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Check, Copy } from "lucide-react"

export function ContactSection() {
  const [copied, setCopied] = useState(false)
  const email = "neel.khatri@example.com"

  const copyEmail = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="bg-[#0A0A0A] py-32 md:py-40 lg:py-48 px-6 md:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-white/30 mb-8">
            Available for Internships
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-10 leading-[1.1]">
            Let's Build
            <br />
            Something Great.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-14"
        >
          <button
            onClick={copyEmail}
            className="inline-flex items-center gap-3 px-8 py-4 text-sm tracking-[0.12em] uppercase bg-white text-black hover:bg-white/90 transition-all duration-300 rounded-full font-medium"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" strokeWidth={2} />
                Copied!
              </>
            ) : (
              <>
                <Mail className="w-4 h-4" strokeWidth={2} />
                Get in Touch
              </>
            )}
          </button>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex items-center justify-center gap-6"
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/30 hover:text-white transition-colors p-2"
            aria-label="GitHub"
          >
            <Github className="w-6 h-6" strokeWidth={1.5} />
          </a>
          <a
            href="https://linkedin.com"
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
            <Copy className="w-6 h-6" strokeWidth={1.5} />
          </a>
        </motion.div>

        {/* Footer text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-20 text-[10px] text-white/20 tracking-[0.15em] uppercase"
        >
          Designed & Built by Neel Khatri © 2025
        </motion.p>
      </div>
    </section>
  )
}
