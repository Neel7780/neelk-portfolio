"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { FloatingIcons } from "@/components/floating-icons"
import { ExperienceSection } from "@/components/experience-section"
import { ProjectsSection } from "@/components/projects-section"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { Github, Linkedin } from "lucide-react"
import { Project, Experience } from "@/lib/notion"

interface HomeClientProps {
  projects: Project[];
  experience: Experience[];
}

export function HomeClient({ projects, experience }: HomeClientProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  // rAF-based smooth cursor targets (pixel values relative to hero)
  const targetX = useRef<number>(0)
  const targetY = useRef<number>(0)
  const currentX = useRef<number>(0)
  const currentY = useRef<number>(0)
  const cursorRef = useRef<HTMLDivElement | null>(null)

  // remove per-frame state updates; we'll update overlay clipPath directly via ref
  const overlayRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setIsClient(true)
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0)
  }, [])

  useEffect(() => {
    if (!isClient || isTouchDevice) return

    let raf = 0
    // lerp factor (0-1) - higher = snappier, lower = softer.
    // Lowered for a heavier, more inertial feel. Tune upward for less weight.
    const ease = 0.14

    const loop = () => {
      // lerp current -> target
      currentX.current += (targetX.current - currentX.current) * ease
      currentY.current += (targetY.current - currentY.current) * ease

      // clamp to hero bounds
      if (heroRef.current) {
        const r = heroRef.current.getBoundingClientRect()
        currentX.current = Math.max(0, Math.min(currentX.current, r.width))
        currentY.current = Math.max(0, Math.min(currentY.current, r.height))
      }

      // compute movement speed to add a subtle scale for momentum (heavier feel)
      const dx = targetX.current - currentX.current
      const dy = targetY.current - currentY.current
      const speed = Math.hypot(dx, dy)
      // reduce max scale for a subtler effect
      const scale = 1 + Math.min(0.08, speed / 220) // up to ~1.08 scale when moving fast

      // update overlay clipPath directly (avoid per-frame setState)
      if (overlayRef.current) {
        overlayRef.current.style.clipPath = `circle(200px at ${currentX.current}px ${currentY.current}px)`
      }

      // update cursor element transform directly (avoids rerenders)
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${currentX.current}px, ${currentY.current}px) translate(-50%, -50%) scale(${scale})`
      }

      raf = requestAnimationFrame(loop)
    }

    raf = requestAnimationFrame(loop)

    return () => cancelAnimationFrame(raf)
  }, [isClient, isTouchDevice])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current || isTouchDevice) return
    const rect = heroRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    if (Number.isFinite(x) && Number.isFinite(y)) {
      targetX.current = x
      targetY.current = y
    }
  }

  const handleMouseLeave = (e: React.MouseEvent) => {
    if (!heroRef.current || isTouchDevice) return
    // keep last target on leave to avoid snapping
  }

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (!heroRef.current || isTouchDevice) return
    const rect = heroRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    if (Number.isFinite(x) && Number.isFinite(y)) {
      targetX.current = x
      targetY.current = y
      // seed current so we don't animate from 0,0 on first enter
      currentX.current = x
      currentY.current = y
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
      }
      if (overlayRef.current) {
        overlayRef.current.style.clipPath = `circle(200px at ${x}px ${y}px)`
      }
    }
  }

  const headlineStyles: React.CSSProperties = {
    letterSpacing: "-0.02em",
    lineHeight: "1",
    fontWeight: 900,
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <Navbar />

      <section
        id="hero"
        ref={heroRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        className="relative w-full h-screen overflow-hidden cursor-none"
      >
        <div className="absolute inset-0 bg-[#F8F8F8]">
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage: `
                linear-gradient(to right, #00000015 1px, transparent 1px),
                linear-gradient(to bottom, #00000015 1px, transparent 1px)
              `,
              backgroundSize: "24px 24px",
            }}
          />

          <FloatingIcons variant="dark" />

          <div className="absolute inset-0 grid place-items-center px-6 md:px-8">
            <div className="text-center w-full max-w-4xl">
              <h1
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-black uppercase font-sans"
                style={headlineStyles}
              >
                NEEL KHATRI
              </h1>

              <p className="mt-6 md:mt-8 text-sm md:text-base text-black/50 tracking-wide">
                2nd Year Student • Software Developer
              </p>
            </div>
          </div>

          {/* Social links - bottom left */}
          <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8 flex items-center gap-4 z-40">
            <a
              href="https://github.com/Neel7780"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black/40 hover:text-black transition-colors"
            >
              <Github className="w-5 h-5" strokeWidth={1.5} />
            </a>
            <a
              href="https://www.linkedin.com/in/neel-khatri-aa1618242/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black/40 hover:text-black transition-colors"
            >
              <Linkedin className="w-5 h-5" strokeWidth={1.5} />
            </a>
          </div>

          {/* Resume button - bottom right */}
          <div className="absolute bottom-6 md:bottom-8 right-6 md:right-8 z-200">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-[10px] md:text-xs tracking-[0.15em] uppercase border border-black/20 text-black/60 hover:bg-black hover:text-white transition-all duration-300 bg-[#F8F8F8]"
            >
              Download Resume
            </a>
          </div>
        </div>

        {!isTouchDevice && (
          <motion.div
            ref={overlayRef}
            className="absolute inset-0 bg-[#0A0A0A] hidden md:block"
            style={{}}
          >
            {/* Grid pattern (inverted) */}
            <div
              className="absolute inset-0 opacity-[0.25]"
              style={{
                backgroundImage: `
                  linear-gradient(to right, #ffffff10 1px, transparent 1px),
                  linear-gradient(to bottom, #ffffff10 1px, transparent 1px)
                `,
                backgroundSize: "24px 24px",
              }}
            />

            <FloatingIcons variant="light" />

            <div className="absolute inset-0 grid place-items-center px-6 md:px-8">
              <div className="text-center w-full max-w-4xl">
                <h1
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white uppercase font-mono"
                  style={headlineStyles}
                >
                  POWERED BY MATH & CODE
                </h1>

                <p className="mt-6 md:mt-8 text-sm md:text-base text-white/50 tracking-wide font-mono">
                  C++ • Next.js • Algorithms • MERN Stack
                </p>
              </div>
            </div>

            {/* Social links - bottom left (inverted) */}
            <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8 flex items-center gap-4 z-40">
              <a
                href="https://github.com/Neel7780"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" strokeWidth={1.5} />
              </a>
              <a
                href="https://www.linkedin.com/in/neel-khatri-aa1618242/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" strokeWidth={1.5} />
              </a>
            </div>

            {/* Resume button - bottom right (inverted) */}
            <div className="absolute bottom-6 md:bottom-8 right-6 md:right-8 z-200">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-[10px] md:text-xs tracking-[0.15em] uppercase border border-white/20 text-white/60 hover:bg-white hover:text-black transition-all duration-300 font-mono bg-[#0A0A0A]"
              >
                Download Resume
              </a>
            </div>
          </motion.div>
        )}

        {/* Custom crosshair cursor */}
        {!isTouchDevice && (
          <div
            ref={cursorRef}
            className="pointer-events-none absolute z-100 hidden md:block"
            style={{
              transform: `translate(${currentX.current}px, ${currentY.current}px) translate(-50%, -50%) scale(1)`,
              willChange: "transform, box-shadow",
              boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
            }}
          >
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 rounded-full border-[1.5px] border-white mix-blend-difference" />
              <div className="absolute top-1/2 left-1/2 w-3 h-1px -translate-x-1/2 -translate-y-1/2 bg-white mix-blend-difference" />
              <div className="absolute top-1/2 left-1/2 w-1px h-3 -translate-x-1/2 -translate-y-1/2 bg-white mix-blend-difference" />
            </div>
          </div>
        )}
      </section>

      <ExperienceSection experience={experience} />
      <ProjectsSection projects={projects} />
      <AboutSection />
      <ContactSection />
    </div>
  )
}
