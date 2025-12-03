"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-8 py-4 md:py-5 bg-white/70 dark:bg-black/70 backdrop-blur-md border-b border-black/5 dark:border-white/5 transition-colors duration-300">
        <div className="flex items-center">
          <button
            onClick={() => scrollToSection("hero")}
            className="text-sm tracking-[0.15em] font-semibold text-black dark:text-white hover:opacity-60 transition-opacity"
          >
            NEEL.TECH
          </button>
        </div>

        <div className="flex items-center gap-4">
          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8 text-xs tracking-[0.12em] uppercase font-medium">
            <button
              onClick={() => scrollToSection("experience")}
              className="text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors"
            >
              Experience
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors"
            >
              Work
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors"
            >
              Contact
            </button>
          </div>

          <div className="hidden md:block">
            <ThemeToggle />
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden text-black dark:text-white p-2 -mr-2"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-100 bg-white dark:bg-black md:hidden"
          >
            {/* Close button */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-4 right-4 p-2 text-black dark:text-white"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" strokeWidth={1.5} />
            </button>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.15, duration: 0.2 }}
              className="flex flex-col items-center justify-center h-full gap-10"
            >
              <button
                onClick={() => scrollToSection("hero")}
                className="text-3xl font-semibold tracking-[0.08em] uppercase text-black dark:text-white hover:opacity-50 transition-opacity"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("experience")}
                className="text-3xl font-semibold tracking-[0.08em] uppercase text-black dark:text-white hover:opacity-50 transition-opacity"
              >
                Experience
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="text-3xl font-semibold tracking-[0.08em] uppercase text-black dark:text-white hover:opacity-50 transition-opacity"
              >
                Work
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-3xl font-semibold tracking-[0.08em] uppercase text-black dark:text-white hover:opacity-50 transition-opacity"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-3xl font-semibold tracking-[0.08em] uppercase text-black dark:text-white hover:opacity-50 transition-opacity"
              >
                Contact
              </button>
              <div className="mt-4">
                <ThemeToggle />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
