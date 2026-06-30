"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Github, Clock, MapPin, Code, Play, Star } from "lucide-react"

interface HeroCardsProps {
  variant: "light" | "dark"
  isMobile?: boolean
  hoveredCard?: "spotify" | "github" | "status" | null
  setHoveredCard?: (card: "spotify" | "github" | "status" | null) => void
  pointerEventsNone?: boolean
}

// Premium Spotify Icon
const SpotifyIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.783-8.892-.982-.336.075-.668-.135-.744-.47-.076-.336.135-.668.47-.743 3.856-.88 7.15-.51 9.822 1.128.296.18.387.563.204.86zm1.224-2.723c-.226.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.075-1.183-.413.125-.85-.107-.975-.52-.125-.413.107-.85.52-.975 3.66-1.11 8.225-.573 11.345 1.348.367.226.488.707.26 1.07zM17.92 11.13c-.272.446-.857.592-1.302.32-3.148-1.87-8.336-2.042-11.378-1.118-.503.153-1.03-.135-1.18-.637-.15-.502.137-1.03.64-1.18 3.612-1.097 9.35-.898 12.9 1.21.447.268.593.853.32 1.305z"/>
  </svg>
)

// Isolated live clock component to prevent re-renders of the parent cards
function LiveClock() {
  const [time, setTime] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }
      setTime(new Intl.DateTimeFormat("en-US", options).format(new Date()))
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return <span>{mounted ? time : "00:00:00 AM"}</span>
}

export function HeroCards({ variant, isMobile = false, hoveredCard = null, setHoveredCard, pointerEventsNone = false }: HeroCardsProps) {
  const [activeMobileTab, setActiveMobileTab] = useState<"spotify" | "github" | "status">("spotify")
  const [stats, setStats] = useState<any>(null)

  // Fetch live stats on mount to populate floating cards with real data
  useEffect(() => {
    fetch("/api/live-stats")
      .then((res) => {
        if (res.ok) return res.json()
        throw new Error("Failed to load live stats")
      })
      .then((data) => setStats(data))
      .catch((err) => console.warn("Floating cards live stats fetch failed:", err))
  }, [])

  const isDarkCard = variant === "dark"

  const glassBase = isDarkCard
    ? "bg-black/75 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] text-white"
    : "bg-white/75 backdrop-blur-xl border border-black/10 shadow-[0_20px_50px_rgba(31,38,135,0.1)] text-black"

  const labelClass = isDarkCard ? "text-neutral-400" : "text-neutral-500"

  const githubBlocks = [
    [2, 0, 1, 3, 0, 2, 4, 1, 0],
    [0, 1, 2, 0, 3, 1, 0, 2, 3],
    [1, 3, 0, 2, 1, 0, 4, 0, 1],
    [2, 0, 3, 1, 0, 3, 2, 1, 2],
  ]

  const getGithubColor = (level: number) => {
    if (isDarkCard) {
      switch (level) {
        case 0: return "bg-neutral-900 border border-white/5"
        case 1: return "bg-emerald-950"
        case 2: return "bg-emerald-800"
        case 3: return "bg-emerald-600"
        case 4: return "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]"
        default: return "bg-neutral-900"
      }
    } else {
      switch (level) {
        case 0: return "bg-neutral-100 border border-black/5"
        case 1: return "bg-emerald-100"
        case 2: return "bg-emerald-300"
        case 3: return "bg-emerald-500"
        case 4: return "bg-emerald-600 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
        default: return "bg-neutral-100"
      }
    }
  }

  // ==================== PREMIUM DETAILED RENDERERS ====================

  // Spotify Card: Renders as a clickable link redirecting to your real Spotify profile
  const SpotifyDetailed = ({ isHovered }: { isHovered: boolean }) => {
    const topTrack = stats?.spotify?.tracks && Array.isArray(stats.spotify.tracks) && stats.spotify.tracks.length > 0
      ? stats.spotify.tracks[0]
      : null

    const albumPoster = topTrack?.poster || "/spotify_album_art.jpg"
    const trackName = topTrack?.name || "After Hours"
    const artistName = topTrack?.artist || "The Weeknd"

    return (
      <a 
        href="https://open.spotify.com/user/31afnn2j5cirmuqfacj3s36nkhbi?si=8ccba493fba14a29"
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-full h-full flex items-center justify-start p-3.5 overflow-hidden cursor-pointer"
      >
        {/* Spinning Vinyl */}
        <motion.div
          className="absolute left-3.5 w-28 h-28 rounded-full bg-neutral-950 border-4 border-neutral-800 flex items-center justify-center shadow-xl z-0"
          initial={{ x: 0, rotate: 0 }}
          animate={{
            x: isHovered ? 80 : 0,
            rotate: isHovered ? 360 : 0,
          }}
          transition={{
            x: { type: "spring", stiffness: 100, damping: 18 },
            rotate: isHovered 
              ? { repeat: Infinity, duration: 6, ease: "linear" } 
              : { duration: 0.5 }
          }}
        >
          <div className="absolute inset-1.5 rounded-full border border-neutral-900/45" />
          <div className="absolute inset-3.5 rounded-full border border-neutral-900/45" />
          <div className="absolute inset-6 rounded-full border border-neutral-900/45" />
          <div className="w-9 h-9 rounded-full bg-emerald-500 overflow-hidden border-2 border-neutral-950 flex items-center justify-center shrink-0">
            <img src={albumPoster} alt="cover center" className="w-full h-full object-cover" />
          </div>
        </motion.div>

        {/* Album Sleeve */}
        <div className="relative w-28 h-28 rounded-xl overflow-hidden shadow-2xl z-10 border border-white/15 bg-neutral-900 shrink-0 group">
          <img src={albumPoster} alt={`${trackName} Cover`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            </div>
          </div>

          <div className="absolute bottom-0 inset-x-0 bg-black/80 backdrop-blur-md p-1.5 flex flex-col">
            <div className="flex justify-between items-center">
              <div className="overflow-hidden pr-1.5">
                <h4 className="text-white text-[9px] font-bold truncate tracking-wide">{trackName}</h4>
                <p className="text-neutral-400 text-[7px] truncate">{artistName}</p>
              </div>
              <div className="flex items-end gap-0.5 h-3 shrink-0">
                <div className="w-0.5 bg-emerald-500 rounded-full animate-[equalize_0.8s_ease-in-out_infinite]" style={{ height: "3px" }} />
                <div className="w-0.5 bg-emerald-500 rounded-full animate-[equalize_0.6s_ease-in-out_infinite_0.15s]" style={{ height: "8px" }} />
                <div className="w-0.5 bg-emerald-500 rounded-full animate-[equalize_0.7s_ease-in-out_infinite_0.3s]" style={{ height: "5px" }} />
              </div>
            </div>
          </div>
        </div>
      </a>
    )
  }

  // GitHub Card: Renders as a clickable link redirecting to your real GitHub profile
  const GithubDetailed = () => (
    <a 
      href="https://github.com/Neel7780"
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col w-full h-full p-4 justify-between cursor-pointer"
    >
      <div className="flex justify-between items-center">
        <span className="text-[10px] tracking-[0.2em] font-mono uppercase flex items-center gap-1.5 font-bold">
          <Github className="w-3.5 h-3.5" />
          Git contributions
        </span>
        <span className="text-[8px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center gap-1">
          <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" /> Active
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-rows-4 grid-flow-col gap-1 my-2 justify-center">
        {githubBlocks.map((row, rIdx) =>
          row.map((level, cIdx) => (
            <div
              key={`${rIdx}-${cIdx}`}
              className={`w-3 h-3 rounded-[2px] transition-transform duration-300 hover:scale-125 cursor-pointer ${getGithubColor(level)}`}
            />
          ))
        )}
      </div>

      {/* Real Live Stats */}
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center">
        <div>
          <div className="text-[10px] font-bold font-mono">
            {stats?.github?.commits ? `${stats.github.commits.toLocaleString()}` : "1,420"}
          </div>
          <div className={`text-[6px] uppercase tracking-wider ${labelClass}`}>Commits</div>
        </div>
        <div>
          <div className="text-[10px] font-bold font-mono">15 Days</div>
          <div className={`text-[6px] uppercase tracking-wider ${labelClass}`}>Streak</div>
        </div>
        <div>
          <div className="text-[10px] font-bold font-mono">
            {stats?.github?.repos || "24"}
          </div>
          <div className={`text-[6px] uppercase tracking-wider ${labelClass}`}>Repos</div>
        </div>
      </div>
    </a>
  )

  // Status/Clock Card: Renders as a clickable link redirecting to your real Codeforces profile
  const StatusDetailed = () => (
    <a 
      href="https://codeforces.com/profile/neel212006"
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col w-full h-full p-4 justify-between cursor-pointer"
    >
      <div className="flex justify-between items-center">
        <span className="text-[10px] tracking-[0.2em] font-mono uppercase flex items-center gap-1.5 font-bold text-violet-400">
          <Code className="w-3.5 h-3.5" />
          Neel's status
        </span>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
        </span>
      </div>

      <div className="space-y-1.5 my-1">
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
          <div className="font-mono text-[11px] font-bold tracking-widest text-violet-300">
            <LiveClock />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
          <span className="text-[9px] font-medium truncate">Gandhinagar, India</span>
        </div>
      </div>

      {/* Real Live Codeforces Rating integrated dynamically */}
      <div className={`text-[8px] leading-relaxed p-1.5 rounded-lg ${isDarkCard ? "bg-white/5" : "bg-black/5"} border border-white/5`}>
        <span className="font-semibold text-violet-400 uppercase tracking-wide flex items-center gap-1"><Star className="w-2 h-2" /> Focus</span> 
        {stats?.codeforces?.rating 
          ? `CF rating: ${stats.codeforces.rating} (${stats.codeforces.rank.toUpperCase()}) | Solved: ${stats.codeforces.solved}`
          : "Designing high-performance interfaces & mastering C++ algorithms."}
      </div>
    </a>
  )

  // ==================== SYNCHRONIZED DESKTOP CARD WRAPPER ====================
  const DesktopFloatingCard = ({ 
    type, 
    positionClass, 
    glowClass, 
    hoverGlowClass, 
    expandedWidth,
    expandedHeight,
    children 
  }: { 
    type: "spotify" | "github" | "status"
    positionClass: string
    glowClass: string
    hoverGlowClass: string
    expandedWidth: string
    expandedHeight: string
    children: (isHovered: boolean) => React.ReactNode
  }) => {
    const isHovered = hoveredCard === type

    const handleMouseEnter = () => {
      if (setHoveredCard) setHoveredCard(type)
    }

    const handleMouseLeave = () => {
      if (setHoveredCard) setHoveredCard(null)
    }

    return (
      <motion.div
        className={`absolute ${positionClass} z-30 hidden md:block ${
          pointerEventsNone ? "pointer-events-none" : ""
        }`}
        animate={{ y: [0, type === "spotify" ? -10 : type === "github" ? 10 : -8, 0] }}
        transition={{ 
          duration: type === "spotify" ? 5 : type === "github" ? 6 : 4.5, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: type === "spotify" ? 0 : type === "github" ? 0.5 : 1
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Floating Particles - Emit from behind the collapsed square card */}
        {!isHovered && (
          <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-visible">
            {type === "spotify" && (
              <>
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-500/60 text-xs animate-particle-1">♪</span>
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-400/50 text-sm animate-particle-2">♫</span>
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-500/40 text-[10px] animate-particle-3">♬</span>
              </>
            )}
            {type === "github" && (
              <>
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-neutral-400/60 font-mono text-[9px] animate-particle-1">&lt;/&gt;</span>
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-yellow-500/40 text-[9px] animate-particle-2">★</span>
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-neutral-400/50 font-mono text-xs animate-particle-3">+</span>
              </>
            )}
            {type === "status" && (
              <>
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-violet-400/60 text-[10px] animate-particle-1">✨</span>
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-violet-400/50 text-xs animate-particle-2">•</span>
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-violet-500/40 font-mono text-[9px] animate-particle-3">$</span>
              </>
            )}
          </div>
        )}

        <motion.div
          layout
          className={`flex items-center justify-center overflow-hidden transition-shadow duration-300 ${glassBase} ${
            isHovered ? `shadow-2xl ${hoverGlowClass}` : glowClass
          }`}
          style={{
            borderRadius: "16px",
            width: isHovered ? expandedWidth : "68px",
            height: isHovered ? expandedHeight : "68px",
          }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
        >
          <AnimatePresence mode="wait">
            {!isHovered ? (
              <motion.div
                key="icon"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                className="w-16 h-16 flex items-center justify-center shrink-0"
              >
                {type === "spotify" && <SpotifyIcon className="w-8 h-8 text-emerald-500 drop-shadow-[0_0_6px_rgba(16,185,129,0.4)]" />}
                {type === "github" && <Github className="w-8 h-8 text-neutral-800 dark:text-white shrink-0 drop-shadow-[0_0_6px_rgba(255,255,255,0.25)]" />}
                {type === "status" && <Code className="w-8 h-8 text-violet-400 shrink-0 drop-shadow-[0_0_6px_rgba(139,92,246,0.4)]" />}
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full h-full shrink-0"
              >
                {children(isHovered)}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    )
  }

  // ==================== MOBILE LAYOUT ====================
  if (isMobile) {
    return (
      <div className="w-full flex flex-col items-center mt-8 px-4 z-50">
        {/* Tab Selection Row */}
        <div className="flex justify-center items-center gap-6 mb-8">
          <button
            onClick={() => setActiveMobileTab("spotify")}
            className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 ${
              activeMobileTab === "spotify"
                ? "bg-emerald-500/20 border-emerald-500 text-emerald-400 scale-110 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                : `${isDarkCard ? "bg-white/5 border-white/10 text-neutral-400" : "bg-black/5 border-black/10 text-neutral-500"}`
            }`}
          >
            <SpotifyIcon className="w-5 h-5" />
          </button>

          <button
            onClick={() => setActiveMobileTab("github")}
            className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 ${
              activeMobileTab === "github"
                ? "bg-neutral-800/20 border-neutral-400 text-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                : `${isDarkCard ? "bg-white/5 border-white/10 text-neutral-400" : "bg-black/5 border-black/10 text-neutral-500"}`
            }`}
          >
            <Github className="w-5 h-5" />
          </button>

          <button
            onClick={() => setActiveMobileTab("status")}
            className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 ${
              activeMobileTab === "status"
                ? "bg-violet-500/20 border-violet-500 text-violet-400 scale-110 shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                : `${isDarkCard ? "bg-white/5 border-white/10 text-neutral-400" : "bg-black/5 border-black/10 text-neutral-500"}`
            }`}
          >
            <Code className="w-5 h-5" />
          </button>
        </div>

        {/* Display Container */}
        <div className={`p-1 rounded-2xl ${glassBase} overflow-hidden w-64 h-40 flex items-center justify-center transition-all duration-300 shadow-xl`}>
          <AnimatePresence mode="wait">
            {activeMobileTab === "spotify" && (
              <motion.div
                key="mob-spotify"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="w-full h-full"
              >
                <SpotifyDetailed isHovered={true} />
              </motion.div>
            )}

            {activeMobileTab === "github" && (
              <motion.div
                key="mob-github"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="w-full h-full"
              >
                <GithubDetailed />
              </motion.div>
            )}

            {activeMobileTab === "status" && (
              <motion.div
                key="mob-status"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="w-full h-full"
              >
                <StatusDetailed />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    )
  }

  // ==================== DESKTOP LAYOUT ====================
  return (
    <>
      {/* Spotify Card - Left Side */}
      <DesktopFloatingCard
        type="spotify"
        positionClass="top-[28%] left-[12%]"
        glowClass="shadow-[0_0_15px_rgba(16,185,129,0.08)]"
        hoverGlowClass="shadow-[0_0_35px_rgba(16,185,129,0.3)] border-emerald-500/30"
        expandedWidth="240px"
        expandedHeight="156px"
      >
        {(isHovered) => <SpotifyDetailed isHovered={isHovered} />}
      </DesktopFloatingCard>

      {/* GitHub Card - Right Side */}
      <DesktopFloatingCard
        type="github"
        positionClass="top-[22%] right-[12%]"
        glowClass="shadow-[0_0_15px_rgba(255,255,255,0.05)]"
        hoverGlowClass="shadow-[0_0_35px_rgba(255,255,255,0.2)] border-white/30"
        expandedWidth="280px"
        expandedHeight="180px"
      >
        {() => <GithubDetailed />}
      </DesktopFloatingCard>

      {/* Status Card - Bottom Left */}
      <DesktopFloatingCard
        type="status"
        positionClass="bottom-[26%] left-[16%]"
        glowClass="shadow-[0_0_15px_rgba(139,92,246,0.08)]"
        hoverGlowClass="shadow-[0_0_35px_rgba(139,92,246,0.3)] border-violet-500/30"
        expandedWidth="280px"
        expandedHeight="160px"
      >
        {() => <StatusDetailed />}
      </DesktopFloatingCard>
    </>
  )
}
