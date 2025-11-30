import { Terminal, Globe, Cpu, Database } from "lucide-react"

interface FloatingIconsProps {
  variant: "dark" | "light"
}

export function FloatingIcons({ variant }: FloatingIconsProps) {
  const color = variant === "dark" ? "text-black/20" : "text-white/20"

  return (
    <>
      <div className={`absolute top-40 left-12 md:left-20 ${color} animate-float-slow`}>
        <Terminal className="w-6 h-6 md:w-8 md:h-8" strokeWidth={1.5} />
      </div>

      <div className={`absolute top-44 right-12 md:right-24 ${color} animate-float-medium`}>
        <Globe className="w-6 h-6 md:w-8 md:h-8" strokeWidth={1.5} />
      </div>

      <div className={`absolute bottom-28 left-16 md:left-28 ${color} animate-float-medium`}>
        <Cpu className="w-6 h-6 md:w-8 md:h-8" strokeWidth={1.5} />
      </div>

      <div className={`absolute bottom-32 right-16 md:right-32 ${color} animate-float-slow`}>
        <Database className="w-6 h-6 md:w-8 md:h-8" strokeWidth={1.5} />
      </div>
    </>
  )
}
