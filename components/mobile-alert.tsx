"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"

const STORAGE_KEY = "mobileAlertDismissed"

export function MobileAlert() {
  const [hasMounted, setHasMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  useEffect(() => {
    if (!hasMounted) return
    setIsDismissed(Boolean(window.sessionStorage.getItem(STORAGE_KEY)))
  }, [hasMounted])

  useEffect(() => {
    if (!hasMounted) return

    const update = () => setIsMobile(window.innerWidth < 768)
    update()

    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [hasMounted])

  const handleDismiss = () => {
    window.sessionStorage.setItem(STORAGE_KEY, "1")
    setIsDismissed(true)
  }

  if (!hasMounted) return null

  const shouldShow = !isDismissed && isMobile

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          key="mobile-alert"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 35 }}
          className="fixed inset-x-4 bottom-6 md:bottom-8 z-50 flex items-center justify-between gap-4 rounded-lg border border-zinc-200 bg-white/90 p-4 text-sm font-medium leading-relaxed text-black shadow-xl backdrop-blur-md backdrop-saturate-150 dark:border-zinc-700 dark:bg-zinc-800/90 dark:text-white"
        >
          <p>Psst! 🤫 This portfolio is packed with animations that look 10x cooler on a laptop. Try it out there if you can!</p>
          <button
            onClick={handleDismiss}
            aria-label="Close recommendation"
            className="text-black/60 transition-colors hover:text-black dark:text-white/60 dark:hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
