import { Terminal, Globe, Cpu, Database } from "lucide-react"

interface FloatingIconsProps {
  variant: "dark" | "light"
}

export function FloatingIcons({ variant }: FloatingIconsProps) {
  const color = variant === "dark" ? "text-black/15" : "text-white/15"

  return (
    <>
      <div className={`absolute top-32 left-8 md:left-16 ${color} animate-float-slow`}>
        <Terminal className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
      </div>

      <div className={`absolute top-40 right-10 md:right-20 ${color} animate-float-medium`}>
        <Globe className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
      </div>

      <div className={`absolute bottom-36 left-12 md:left-24 ${color} animate-float-medium`}>
        <Cpu className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
      </div>

      <div className={`absolute bottom-40 right-12 md:right-28 ${color} animate-float-slow`}>
        <Database className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
      </div>
    </>
  )
}
