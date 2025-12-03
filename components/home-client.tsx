"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion"
import { useTheme } from "next-themes"
import { Navbar } from "@/components/navbar"
import { FloatingIcons } from "@/components/floating-icons"
import { ExperienceSection } from "@/components/experience-section"
import { ProjectsSection } from "@/components/projects-section"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { Github, Linkedin } from "lucide-react"
import { Project, Experience } from "@/lib/notion"

function useTypewriter(words: string[], typingSpeed = 50, deletingSpeed = 30, pauseDuration = 1500) {
  const [currentText, setCurrentText] = useState("")
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return

    const currentWord = words[wordIndex]

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentText.length < currentWord.length) {
            setCurrentText(currentWord.slice(0, currentText.length + 1))
          } else {
            setIsPaused(true)
            setTimeout(() => {
              setIsPaused(false)
              setIsDeleting(true)
            }, pauseDuration)
          }
        } else {
          if (currentText.length > 0) {
            setCurrentText(currentWord.slice(0, currentText.length - 1))
          } else {
            setIsDeleting(false)
            setWordIndex((prev) => (prev + 1) % words.length)
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed,
    )

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, isPaused, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration])

  return currentText
}

interface HomeClientProps {
  projects: Project[];
  experience: Experience[];
}

export function HomeClient({ projects, experience }: HomeClientProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 })

  const clipPath = useMotionTemplate`circle(200px at ${springX}px ${springY}px)`

  const typewriterText = useTypewriter(["Software Developer", "Gamer", "Music Lover", "2nd Year Student"])

  useEffect(() => {
    setIsClient(true)
    setMounted(true)
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return
    const rect = heroRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  const headlineStyles: React.CSSProperties = {
    letterSpacing: "-0.02em",
    lineHeight: "1",
    fontWeight: 900,
  }

  const isDark = mounted && resolvedTheme === "dark"

  const gridColorA = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"
  const gridColorB = isDark ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.05)"

  return (
    <div ref={containerRef} className="relative w-full">
      <Navbar />
      {/* ==================== HERO SECTION WITH FLASHLIGHT ==================== */}
      <section
        id="hero"
        ref={heroRef}
        onMouseMove={handleMouseMove}
        className="relative w-full h-screen overflow-hidden md:cursor-none"
      >
        {/* ==================== LAYER A: Top Layer ==================== */}
        <div className="absolute inset-0 bg-white dark:bg-black transition-colors duration-300">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, ${gridColorA} 1px, transparent 1px),
                linear-gradient(to bottom, ${gridColorA} 1px, transparent 1px)
              `,
              backgroundSize: "24px 24px",
            }}
          />

          <FloatingIcons variant={isDark ? "light" : "dark"} />

          <div className="absolute inset-0 grid place-items-center px-6 md:px-8">
            <div className="text-center w-full max-w-4xl">
              <h1
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-black dark:text-white uppercase font-sans transition-colors duration-300"
                style={headlineStyles}
              >
                NEEL KHATRI
              </h1>

              <div className="mt-4 md:mt-6 font-mono text-sm sm:text-base md:text-lg">
                <span className="text-neutral-700 dark:text-neutral-300">19, </span>
                <span className="text-neutral-700 dark:text-neutral-300">{typewriterText}</span>
                <span className="text-black dark:text-white animate-blink-fast">|</span>
              </div>

              <p className="mt-6 md:mt-8 text-sm md:text-base text-black/50 dark:text-white/40 tracking-wide transition-colors duration-300">
                C++ • Next.js • Algorithms • MERN 
              </p>
            </div>
          </div>

          {/* Social links - bottom left */}
          <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8 flex items-center gap-4 z-40">
            <a
              href="https://github.com/Neel7780"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" strokeWidth={1.5} />
            </a>
            <a
              href="https://linkedin.com/in/neel-khatri-aa1618242/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors"
            >
              <Linkedin className="w-5 h-5" strokeWidth={1.5} />
            </a>
          </div>

          {/* Resume button - bottom right */}
          <div className="absolute bottom-6 md:bottom-8 right-6 md:right-8 z-200">
            <a
              href="./resume.pdf"
              target="_blank"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-[10px] md:text-xs tracking-[0.15em] uppercase border border-black/20 dark:border-white/20 text-black/60 dark:text-white/60 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300 bg-white dark:bg-black"
            >
              Download Resume
            </a>
          </div>
        </div>

        {/* ==================== LAYER B: Revealed Layer (SPOTLIGHT INVERSION) ==================== */}
        {!isTouchDevice && (
          <motion.div
            className="absolute inset-0 bg-black dark:bg-white hidden md:block transition-colors duration-300"
            style={{
              clipPath: isClient ? clipPath : "circle(0px at 50% 50%)",
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(to right, ${gridColorB} 1px, transparent 1px),
                  linear-gradient(to bottom, ${gridColorB} 1px, transparent 1px)
                `,
                backgroundSize: "24px 24px",
              }}
            />

            <FloatingIcons variant={isDark ? "dark" : "light"} />

            <div className="absolute inset-0 grid place-items-center px-6 md:px-8">
              <div className="text-center w-full max-w-4xl">
                <h1
                  className="text-5xl md:text-6xl text-white dark:text-black uppercase font-mono transition-colors duration-300"
                  style={headlineStyles}
                >
                  POWERED BY MATH & CODE
                </h1>

                <div className="mt-4 md:mt-6 font-mono text-sm sm:text-base md:text-lg">
                  <span className="text-green-400 dark:text-blue-600">19, </span>
                  <span className="text-green-400 dark:text-blue-600">{typewriterText}</span>
                  <span className="text-white dark:text-black animate-blink-fast">|</span>
                </div>

                <p className="mt-6 md:mt-8 text-sm md:text-base text-white/50 dark:text-black/50 tracking-wide font-mono transition-colors duration-300">
                  ug @ DAU Gandhinagar
                </p>
              </div>
            </div>

            {/* Social links - bottom left (inverted) */}
            <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8 flex items-center gap-4 z-40">
              <a
                href="https://github.com/Neel7780"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 dark:text-black/40 hover:text-white dark:hover:text-black transition-colors"
              >
                <Github className="w-5 h-5" strokeWidth={1.5} />
              </a>
              <a
                href="https://linkedin.com/in/neel-khatri-aa1618242/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 dark:text-black/40 hover:text-white dark:hover:text-black transition-colors"
              >
                <Linkedin className="w-5 h-5" strokeWidth={1.5} />
              </a>
            </div>

            {/* Resume button - bottom right (inverted) */}
            <div className="absolute bottom-6 md:bottom-8 right-6 md:right-8 z-200">
              <a
                href="/resume.pdf"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-[10px] md:text-xs tracking-[0.15em] uppercase border border-white/20 dark:border-black/20 text-white/60 dark:text-black/60 hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white transition-all duration-300 font-mono bg-black dark:bg-white"
              >
                Download Resume
              </a>
            </div>
          </motion.div>
        )}

        {/* Custom crosshair cursor - desktop only */}
        <motion.div
          className="pointer-events-none fixed z-100 hidden md:block"
          style={{
            x: springX,
            y: springY,
            translateX: "-50%",
            translateY: "-50%",
          }}
        >
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 rounded-full border-[1.5px] border-white mix-blend-difference" />
            <div className="absolute top-1/2 left-1/2 w-3 h-1px -translate-x-1/2 -translate-y-1/2 bg-white mix-blend-difference" />
            <div className="absolute top-1/2 left-1/2 w-1px h-3 -translate-x-1/2 -translate-y-1/2 bg-white mix-blend-difference" />
          </div>
        </motion.div>
      </section>

      {/* ==================== OTHER SECTIONS ==================== */}
      <ExperienceSection experience={experience} />
      <ProjectsSection projects={projects} />
      <AboutSection />
      <ContactSection />
    </div>
  )
}
