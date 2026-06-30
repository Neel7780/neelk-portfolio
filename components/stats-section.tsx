"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Github, BarChart3, Star, Flame, Trophy, Play } from "lucide-react"

// ==================== PREMIUM BRAND LOGO SVGS ====================

// Official Spotify Logo
const SpotifyLogo = (props: any) => (
  <svg viewBox="0 0 24 24" fill="#1DB954" {...props}>
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.783-8.892-.982-.336.075-.668-.135-.744-.47-.076-.336.135-.668.47-.743 3.856-.88 7.15-.51 9.822 1.128.296.18.387.563.204.86zm1.224-2.723c-.226.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.075-1.183-.413.125-.85-.107-.975-.52-.125-.413.107-.85.52-.975 3.66-1.11 8.225-.573 11.345 1.348.367.226.488.707.26 1.07zM17.92 11.13c-.272.446-.857.592-1.302.32-3.148-1.87-8.336-2.042-11.378-1.118-.503.153-1.03-.135-1.18-.637-.15-.502.137-1.03.64-1.18 3.612-1.097 9.35-.898 12.9 1.21.447.268.593.853.32 1.305z"/>
  </svg>
)

// Official LeetCode Logo
const LeetCodeLogo = (props: any) => (
  <svg viewBox="0 0 24 24" fill="#F89F1B" {...props}>
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414 0-1.954l-4.148-4.148-.035-.035a1.374 1.374 0 0 0-.965-.438h-.839l.839 1.258-2.673 2.674 1.742 1.742 1.742-1.742.839 1.258.839-1.258.047.047 3.328 3.328a2.768 2.768 0 0 1 0 3.906l-2.396 2.392c-1.391 1.387-3.621 1.41-5.027.07l-.039-.039-4.277-4.193a3.178 3.178 0 0 1-.68-1.015 3.393 3.393 0 0 1-.035-1.445 3.197 3.197 0 0 1 .078-.305 3.149 3.149 0 0 1 .715-1.254l3.854-4.126 5.406-5.788c.371-.371.863-.559 1.355-.559z" />
  </svg>
)

// Official Codeforces Logo (Three color columns)
const CodeforcesLogo = (props: any) => (
  <svg viewBox="0 0 24 24" {...props} className={`flex ${props.className || ""}`}>
    <rect x="3" y="10" width="4.5" height="12" fill="#3B5998" rx="1" />
    <rect x="9.5" y="3" width="4.5" height="19" fill="#FF5555" rx="1" />
    <rect x="16" y="7" width="4.5" height="15" fill="#FFCC00" rx="1" />
  </svg>
)

export function StatsSection() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Fetch live statistics from our Next.js API route on mount
  useEffect(() => {
    fetch("/api/live-stats")
      .then((res) => {
        if (res.ok) return res.json()
        throw new Error("Failed to fetch statistics")
      })
      .then((data) => {
        setStats(data)
        setLoading(false)
      })
      .catch((err) => {
        console.warn("Live stats fetch failed, using fallback metrics:", err)
        setLoading(false)
      })
  }, [])

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const cardVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
      },
    },
  }

  // Top 5 Streamed Artists with real album poster cover art
  const topArtists = [
    { rank: 1, name: "The Weeknd", genre: "R&B / Pop", streams: "1,240 mins", progress: 95, poster: "/spotify_album_art.jpg" },
    { rank: 2, name: "Travis Scott", genre: "Hip-Hop / Trap", streams: "980 mins", progress: 75, poster: "/travis_art.jpg" },
    { rank: 3, name: "Post Malone", genre: "Pop / Rap", streams: "820 mins", progress: 63, poster: "/post_art.jpg" },
    { rank: 4, name: "Daft Punk", genre: "Electronic", streams: "740 mins", progress: 57, poster: "/daft_art.jpg" },
    { rank: 5, name: "Chase Atlantic", genre: "Alternative / Rock", streams: "610 mins", progress: 47, poster: "/chase_art.jpg" },
  ]

  const hasLiveSpotify = stats?.spotify?.artists && Array.isArray(stats.spotify.artists) && stats.spotify.artists.length > 0;

  const spotifyItems = hasLiveSpotify 
    ? stats.spotify.artists.map((item: any) => ({
        rank: item.rank,
        name: item.name,
        subtitle: item.genres,
        detail: item.popularity,
        progress: item.progress,
        poster: item.poster,
        playUrl: item.playUrl,
        isLive: true
      }))
    : topArtists.map((artist) => ({
        rank: artist.rank,
        name: artist.name,
        subtitle: artist.genre,
        detail: artist.streams,
        progress: artist.progress,
        poster: artist.poster,
        playUrl: "https://open.spotify.com/user/31afnn2j5cirmuqfacj3s36nkhbi?si=8ccba493fba14a29",
        isLive: false
      }));

  const isDarkCard = true
  const glassBase = "bg-white/40 dark:bg-black/40 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-xl text-black dark:text-white"
  const labelClass = "text-neutral-500 dark:text-neutral-400"
  const progressBg = "bg-neutral-200 dark:bg-neutral-800"

  const getCFRankClass = (rank: string) => {
    const r = rank.toLowerCase()
    if (r.includes("expert")) return "text-blue-500"
    if (r.includes("specialist")) return "text-cyan-500"
    if (r.includes("pupil")) return "text-green-500"
    return "text-neutral-500 dark:text-neutral-400"
  }

  return (
    <section id="stats" className="relative w-full py-24 px-6 md:px-12 lg:px-24 bg-[#f8f8f8] dark:bg-[#0a0a0a] border-t border-black/5 dark:border-white/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="mb-16">
          <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] text-neutral-500 block mb-3">
            // My Profile in Numbers
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-black dark:text-white transition-colors duration-300">
            METRICS & STATS
          </h2>
        </div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          
          {/* ==================== COLUMN 1: SPOTIFY METRICS (5 Cols) ==================== */}
          <motion.div 
            className="lg:col-span-5 flex flex-col gap-6"
            variants={cardVariants}
          >
            {/* Spotify Stats Card */}
            <div className={`p-6 md:p-8 rounded-3xl ${glassBase} flex flex-col justify-between transition-colors`}>
              <div>
                <div className="flex justify-between items-center mb-6">
                  {/* Premium Brand Logo */}
                  <div className="flex items-center gap-2.5">
                    <SpotifyLogo className="w-6 h-6 animate-pulse drop-shadow-[0_0_8px_rgba(29,185,84,0.3)]" />
                    <span className="font-sans font-black tracking-wider uppercase text-base text-emerald-500">Spotify</span>
                  </div>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    {hasLiveSpotify ? "Live Top Artists" : "Top Artists"}
                  </span>
                </div>

                <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-6 font-mono leading-relaxed">
                  {hasLiveSpotify 
                    ? "My real-time most-streamed tracks from Spotify, reflecting my current coding vibe."
                    : "My most-streamed musical artists. Syncing code blocks to synthwave, trap, and dark R&B beats."}
                </p>

                {/* Artists/Tracks Ranked List */}
                <div className="space-y-4">
                  {spotifyItems.map((item: any) => (
                    <a
                      key={item.rank}
                      href={item.playUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex flex-col gap-1.5 p-2 rounded-xl hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors duration-300 block"
                    >
                      <div className="flex justify-between items-center z-10">
                        <div className="flex items-center gap-3.5 min-w-0">
                          <span className="text-xs font-mono font-bold text-neutral-400 w-4 shrink-0">
                            0{item.rank}
                          </span>
                          
                          {/* Real Album Poster Artwork */}
                          <div className="w-10 h-10 rounded-lg overflow-hidden border border-black/10 dark:border-white/10 shrink-0 shadow-md">
                            <img src={item.poster} alt={`${item.name} Poster`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                          </div>

                          <div className="min-w-0 pr-2">
                            <h4 className="text-sm font-bold text-black dark:text-white transition-colors flex items-center gap-1.5 truncate">
                              <span className="truncate">{item.name}</span>
                              <Play className="w-3 h-3 text-emerald-500 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-4px] group-hover:translate-x-0 shrink-0" />
                            </h4>
                            <p className="text-[10px] text-neutral-400 font-mono truncate">{item.subtitle}</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono font-semibold text-neutral-500 dark:text-neutral-400 shrink-0 max-w-[80px] truncate">{item.detail}</span>
                      </div>
                      
                      {/* Proportion Progress Bar */}
                      <div className={`w-full h-1 ${progressBg} rounded-full overflow-hidden`}>
                        <motion.div 
                          className="h-full bg-emerald-500"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.progress}%` }}
                          transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 * item.rank }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Redirect to Spotify profile */}
              <div className="mt-8 pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[10px] font-mono text-neutral-400">
                <span>Active Trackers: {hasLiveSpotify ? "Live (Spotify API)" : "Demo Mode"}</span>
                <a
                  href="https://open.spotify.com/user/31afnn2j5cirmuqfacj3s36nkhbi?si=8ccba493fba14a29"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-500 hover:underline uppercase tracking-wider text-[8px] font-bold"
                >
                  Spotify Profile &rarr;
                </a>
              </div>
            </div>

            {/* Spotify Live Preview Player Card */}
            <div className={`p-6 rounded-3xl ${glassBase} transition-colors flex flex-col gap-4`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <SpotifyLogo className="w-5 h-5 drop-shadow-[0_0_8px_rgba(29,185,84,0.3)]" />
                  <span className="font-sans font-black tracking-wider uppercase text-sm text-emerald-500">Live Player</span>
                </div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  Preview Playlist
                </span>
              </div>
              <div className="w-full rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-lg bg-neutral-900">
                <iframe
                  title="Spotify Embed: Recommendation Playlist"
                  src="https://open.spotify.com/embed/playlist/1HDsZI9zoaibnEgvyTkCt2?utm_source=generator&theme=0"
                  width="100%"
                  height="100%"
                  style={{ minHeight: '360px' }}
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="rounded-2xl"
                />
              </div>
            </div>
          </motion.div>

          {/* ==================== COLUMN 2: DEV & CP STATS (7 Cols) ==================== */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Row A: LeetCode & Codeforces side-by-side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* LeetCode Card */}
              <motion.div variants={cardVariants} className="h-full">
                <div className={`h-full p-6 rounded-3xl ${glassBase} flex flex-col justify-between transition-colors`}>
                  <div>
                    <div className="flex justify-between items-center mb-5">
                      {/* Premium Brand Logo */}
                      <div className="flex items-center gap-2">
                        <LeetCodeLogo className="w-5 h-5 text-amber-500 drop-shadow-[0_0_8px_rgba(248,159,27,0.3)]" />
                        <span className="font-sans font-black tracking-wider uppercase text-sm text-amber-500">LeetCode</span>
                      </div>
                      <Trophy className="w-4 h-4 text-amber-500" />
                    </div>

                    {/* Problems Solved */}
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-4xl font-black font-mono">
                        {loading ? "..." : stats?.leetcode?.solved || "250"}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-400">Solved</span>
                    </div>

                    <p className="text-[10px] text-neutral-400 font-mono mb-5">
                      {loading ? "Rank: #..." : `Rank: #${stats?.leetcode?.ranking?.toLocaleString() || "142,000"}`}
                    </p>

                    {/* Progress bars */}
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-[9px] font-mono mb-1">
                          <span className="text-emerald-500 font-bold">Easy</span>
                          <span>{loading ? "..." : stats?.leetcode?.easy || "0"}</span>
                        </div>
                        <div className={`w-full h-1.5 ${progressBg} rounded-full overflow-hidden`}>
                          <motion.div 
                            className="h-full bg-emerald-500"
                            initial={{ width: 0 }}
                            whileInView={{ width: stats?.leetcode?.solved ? `${(stats.leetcode.easy / stats.leetcode.solved) * 100}%` : "48%" }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[9px] font-mono mb-1">
                          <span className="text-amber-500 font-bold">Medium</span>
                          <span>{loading ? "..." : stats?.leetcode?.medium || "0"}</span>
                        </div>
                        <div className={`w-full h-1.5 ${progressBg} rounded-full overflow-hidden`}>
                          <motion.div 
                            className="h-full bg-amber-500"
                            initial={{ width: 0 }}
                            whileInView={{ width: stats?.leetcode?.solved ? `${(stats.leetcode.medium / stats.leetcode.solved) * 100}%` : "40%" }}
                            transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[9px] font-mono mb-1">
                          <span className="text-rose-500 font-bold">Hard</span>
                          <span>{loading ? "..." : stats?.leetcode?.hard || "0"}</span>
                        </div>
                        <div className={`w-full h-1.5 ${progressBg} rounded-full overflow-hidden`}>
                          <motion.div 
                            className="h-full bg-rose-500"
                            initial={{ width: 0 }}
                            whileInView={{ width: stats?.leetcode?.solved ? `${(stats.leetcode.hard / stats.leetcode.solved) * 100}%` : "12%" }}
                            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-black/5 dark:border-white/5 text-[9px] font-mono text-neutral-500 flex justify-between items-center">
                    <span>Active Solver</span>
                    <a
                      href="https://leetcode.com/u/aZ80rLixoz/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-500 hover:underline uppercase tracking-wider text-[8px] font-bold"
                    >
                      Profile &rarr;
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Codeforces Card */}
              <motion.div variants={cardVariants} className="h-full">
                <div className={`h-full p-6 rounded-3xl ${glassBase} flex flex-col justify-between transition-colors`}>
                  <div>
                    <div className="flex justify-between items-center mb-5">
                      {/* Premium Brand Logo */}
                      <div className="flex items-center gap-2.5">
                        <CodeforcesLogo className="w-6 h-5 drop-shadow-[0_0_8px_rgba(255,85,85,0.3)]" />
                        <span className="font-sans font-black tracking-wider uppercase text-sm text-cyan-500">Codeforces</span>
                      </div>
                      <BarChart3 className="w-4 h-4 text-cyan-500" />
                    </div>

                    {/* CF Rating */}
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-4xl font-black font-mono text-cyan-500 dark:text-cyan-400">
                        {loading ? "..." : stats?.codeforces?.rating || "971"}
                      </span>
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${getCFRankClass(stats?.codeforces?.rank || "newbie")}`}>
                        {loading ? "newbie" : stats?.codeforces?.rank || "newbie"}
                      </span>
                    </div>

                    <p className="text-[10px] text-neutral-400 font-mono mb-5">
                      Max Rating: {loading ? "..." : stats?.codeforces?.maxRating || "1049"}
                    </p>

                    <div className="space-y-3.5 mt-5">
                      <div className="flex justify-between items-center py-1 border-b border-black/5 dark:border-white/5">
                        <span className="text-[10px] text-neutral-500 dark:text-neutral-400 font-mono">Organization</span>
                        <span className="text-[10px] font-bold text-black dark:text-white font-mono">DA-IICT</span>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-black/5 dark:border-white/5">
                        <span className="text-[10px] text-neutral-500 dark:text-neutral-400 font-mono">Problems Solved</span>
                        <span className="text-[10px] font-bold text-black dark:text-white font-mono">
                          {loading ? "..." : `${stats?.codeforces?.solved || "32"}`}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-[10px] text-neutral-500 dark:text-neutral-400 font-mono">Active Streak</span>
                        <span className="text-[10px] font-bold text-cyan-500 font-mono flex items-center gap-1">
                          <Flame className="w-3.5 h-3.5 fill-current" /> 12 Days
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-black/5 dark:border-white/5 text-[9px] font-mono text-neutral-500 flex justify-between items-center">
                    <span>CP Practitioner</span>
                    <a
                      href="https://codeforces.com/profile/neel212006"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-500 hover:underline uppercase tracking-wider text-[8px] font-bold"
                    >
                      CF Profile &rarr;
                    </a>
                  </div>
                </div>
              </motion.div>

            </div>

            {/* Row B: GitHub Metrics (Full Width) */}
            <motion.div 
              className="w-full"
              variants={cardVariants}
            >
              <div className={`p-6 md:p-8 rounded-3xl ${glassBase} flex flex-col justify-between transition-colors`}>
                <div>
                  <div className="flex justify-between items-center mb-6">
                    {/* Premium Brand Logo */}
                    <div className="flex items-center gap-2.5">
                      <Github className="w-5 h-5 text-neutral-800 dark:text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.15)]" />
                      <span className="font-sans font-black tracking-wider uppercase text-sm">GitHub</span>
                    </div>
                    <span className="text-[9px] font-mono text-neutral-400 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current text-yellow-500" /> Real-time tracking
                    </span>
                  </div>

                  {/* Grid of numbers */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                    
                    <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                      <div className="text-2xl md:text-3xl font-black font-mono text-black dark:text-white">
                        {loading ? "..." : stats?.github?.commits ? `${stats.github.commits.toLocaleString()}+` : "1,420+"}
                      </div>
                      <div className="text-[9px] uppercase tracking-wider text-neutral-400 mt-1 font-mono">Commits</div>
                    </div>

                    <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                      <div className="text-2xl md:text-3xl font-black font-mono text-black dark:text-white">
                        {loading ? "..." : stats?.github?.repos || "24"}
                      </div>
                      <div className="text-[9px] uppercase tracking-wider text-neutral-400 mt-1 font-mono">Repositories</div>
                    </div>

                    <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                      <div className="text-2xl md:text-3xl font-black font-mono text-black dark:text-white">
                        {loading ? "..." : stats?.github?.stars || "0"}
                      </div>
                      <div className="text-[9px] uppercase tracking-wider text-neutral-400 mt-1 font-mono">Stars Earned</div>
                    </div>

                    <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                      <div className="text-2xl md:text-3xl font-black font-mono text-emerald-500">
                        {loading ? "..." : stats?.github?.followers || "12"}
                      </div>
                      <div className="text-[9px] uppercase tracking-wider text-neutral-400 mt-1 font-mono">Followers</div>
                    </div>

                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-black/5 dark:border-white/5 text-[9px] font-mono text-neutral-500 flex justify-between items-center">
                  <span>Developer Activity Grid</span>
                  <a 
                    href="https://github.com/Neel7780" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-black dark:text-white hover:underline uppercase tracking-wider text-[8px] font-bold"
                  >
                    View GitHub Profile &rarr;
                  </a>
                </div>
              </div>
            </motion.div>

          </div>

        </motion.div>
      </div>
    </section>
  )
}
