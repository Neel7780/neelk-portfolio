"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
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

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 })

  const [clipPath, setClipPath] = useState("circle(0px at 50% 50%)")

  useEffect(() => {
    setIsClient(true)
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0)
  }, [])

  useEffect(() => {
    if (!isClient || isTouchDevice) return

    const unsubX = springX.on("change", (x) => {
      const y = springY.get()
      setClipPath(`circle(200px at ${x}px ${y}px)`)
    })
    const unsubY = springY.on("change", (y) => {
      const x = springX.get()
      setClipPath(`circle(200px at ${x}px ${y}px)`)
    })

    return () => {
      unsubX()
      unsubY()
    }
  }, [isClient, isTouchDevice, springX, springY])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current || isTouchDevice) return
    const rect = heroRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  const headlineStyles: React.CSSProperties = {
    letterSpacing: "-0.02em",
    lineHeight: "1",
    fontWeight: 900,
  }

  return (
    <div ref={containerRef} className="relative w-full cursor-none">
      <Navbar />

      {/* ==================== HERO SECTION WITH FLASHLIGHT ==================== */}
      <section
        id="hero"
        ref={heroRef}
        onMouseMove={handleMouseMove}
        className="relative w-full h-screen overflow-hidden"
      >
        {/* ==================== LAYER A: Light/Default Layer ==================== */}
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
                2nd Year Student • Core Member @ GDG On Campus
              </p>
            </div>
          </div>

          {/* Social links - bottom left */}
          <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8 flex items-center gap-4 z-40">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black/40 hover:text-black transition-colors"
            >
              <Github className="w-5 h-5" strokeWidth={1.5} />
            </a>
            <a
              href="https://linkedin.com"
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
              href="#"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-[10px] md:text-xs tracking-[0.15em] uppercase border border-black/20 text-black/60 hover:bg-black hover:text-white transition-all duration-300 bg-[#F8F8F8]"
            >
              Download Resume
            </a>
          </div>
        </div>

        {/* ==================== LAYER B: Dark/Revealed Layer ==================== */}
        {!isTouchDevice && (
          <motion.div
            className="absolute inset-0 bg-[#0A0A0A] hidden md:block"
            style={{
              clipPath: isClient ? clipPath : "circle(0px at 50% 50%)",
            }}
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
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" strokeWidth={1.5} />
              </a>
              <a
                href="https://linkedin.com"
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
                href="#"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-[10px] md:text-xs tracking-[0.15em] uppercase border border-white/20 text-white/60 hover:bg-white hover:text-black transition-all duration-300 font-mono bg-[#0A0A0A]"
              >
                Download Resume
              </a>
            </div>
          </motion.div>
        )}

        {/* Custom crosshair cursor */}
        {!isTouchDevice && (
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
        )}
      </section>

      {/* ==================== OTHER SECTIONS ==================== */}
      <ExperienceSection experience={experience} />
      <ProjectsSection projects={projects} />
      <AboutSection />
      <ContactSection />
    </div>
  )
}
