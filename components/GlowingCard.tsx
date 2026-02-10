import React from "react";
import { motion } from "framer-motion";

interface GlowingCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  delay?: number;
}

const GlowingCard: React.FC<GlowingCardProps> = ({
  children,
  className = "",
  glowColor = "cyan",
  delay = 0,
}) => {
  const glowColors: Record<string, { border: string; glow: string; bg: string }> = {
    cyan: {
      border: "border-cyan-500/50",
      glow: "shadow-cyan-500/20",
      bg: "from-cyan-500/10 to-transparent",
    },
    orange: {
      border: "border-orange-500/50",
      glow: "shadow-orange-500/20",
      bg: "from-orange-500/10 to-transparent",
    },
    mixed: {
      border: "border-cyan-500/30",
      glow: "shadow-cyan-500/15",
      bg: "from-cyan-500/5 via-orange-500/5 to-transparent",
    },
  };

  const colors = glowColors[glowColor] ?? glowColors.cyan ?? {
    border: "border-cyan-500/50",
    glow: "shadow-cyan-500/20",
    bg: "from-cyan-500/10 to-transparent",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.02, y: -5 }}
      className={`relative group ${className}`}
    >
      <div className={`absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-orange-500 rounded-xl opacity-0 group-hover:opacity-75 blur-sm transition-all duration-500`} />
      
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} rounded-xl opacity-50`} />
      
      <div
        className={`relative bg-slate-900/90 backdrop-blur-sm rounded-xl border ${colors.border} shadow-xl ${colors.glow} overflow-hidden transition-all duration-300`}
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
        
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 group-hover:left-full transition-all duration-1000" />
        </div>
        
        {children}
      </div>
    </motion.div>
  );
};

export default GlowingCard;
