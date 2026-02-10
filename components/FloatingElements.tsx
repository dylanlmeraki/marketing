import React from "react";
import { motion } from "framer-motion";

interface FloatingElementsProps {
  className?: string;
}

const FloatingElements: React.FC<FloatingElementsProps> = ({ className = "" }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <motion.div
        className="absolute top-[10%] left-[5%] w-32 h-32"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(6, 182, 212, 0.15)"
            strokeWidth="1"
          />
          <circle
            cx="50"
            cy="50"
            r="35"
            fill="none"
            stroke="rgba(6, 182, 212, 0.1)"
            strokeWidth="1"
            strokeDasharray="8 4"
          />
          <circle
            cx="50"
            cy="50"
            r="25"
            fill="none"
            stroke="rgba(249, 115, 22, 0.15)"
            strokeWidth="1"
          />
          <line x1="50" y1="5" x2="50" y2="20" stroke="rgba(249, 115, 22, 0.3)" strokeWidth="2" />
          <polygon points="50,2 47,8 53,8" fill="rgba(249, 115, 22, 0.4)" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-[15%] right-[8%] w-24 h-24"
        animate={{
          y: [0, 15, 0],
          rotate: [0, -8, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect
            x="10"
            y="10"
            width="80"
            height="80"
            fill="none"
            stroke="rgba(6, 182, 212, 0.12)"
            strokeWidth="1"
          />
          <rect
            x="20"
            y="20"
            width="60"
            height="60"
            fill="none"
            stroke="rgba(249, 115, 22, 0.1)"
            strokeWidth="1"
            strokeDasharray="4 2"
          />
          <line x1="50" y1="10" x2="50" y2="90" stroke="rgba(6, 182, 212, 0.08)" strokeWidth="0.5" />
          <line x1="10" y1="50" x2="90" y2="50" stroke="rgba(6, 182, 212, 0.08)" strokeWidth="0.5" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-[20%] left-[8%] w-20 h-20"
        animate={{
          y: [0, -10, 0],
          x: [0, 5, 0],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polygon
            points="50,10 90,90 10,90"
            fill="none"
            stroke="rgba(249, 115, 22, 0.15)"
            strokeWidth="1"
          />
          <polygon
            points="50,25 75,75 25,75"
            fill="none"
            stroke="rgba(6, 182, 212, 0.1)"
            strokeWidth="1"
          />
          <circle cx="50" cy="55" r="8" fill="rgba(249, 115, 22, 0.1)" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-[25%] right-[5%] w-28 h-28"
        animate={{
          y: [0, 20, 0],
          rotate: [0, 10, 0],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            d="M50 10 L90 50 L50 90 L10 50 Z"
            fill="none"
            stroke="rgba(6, 182, 212, 0.12)"
            strokeWidth="1"
          />
          <path
            d="M50 20 L80 50 L50 80 L20 50 Z"
            fill="none"
            stroke="rgba(249, 115, 22, 0.1)"
            strokeWidth="1"
            strokeDasharray="6 3"
          />
          <circle cx="50" cy="50" r="5" fill="rgba(6, 182, 212, 0.2)" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-[45%] left-[3%] w-16 h-48"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 50 150" className="w-full h-full">
          <line x1="25" y1="0" x2="25" y2="150" stroke="rgba(6, 182, 212, 0.15)" strokeWidth="1" />
          <line x1="25" y1="20" x2="15" y2="20" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="1" />
          <line x1="25" y1="50" x2="10" y2="50" stroke="rgba(249, 115, 22, 0.2)" strokeWidth="1" />
          <line x1="25" y1="80" x2="15" y2="80" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="1" />
          <line x1="25" y1="110" x2="10" y2="110" stroke="rgba(249, 115, 22, 0.2)" strokeWidth="1" />
          <line x1="25" y1="140" x2="15" y2="140" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="1" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-[40%] right-[3%] w-16 h-48"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      >
        <svg viewBox="0 0 50 150" className="w-full h-full">
          <line x1="25" y1="0" x2="25" y2="150" stroke="rgba(249, 115, 22, 0.12)" strokeWidth="1" />
          <line x1="25" y1="30" x2="35" y2="30" stroke="rgba(249, 115, 22, 0.2)" strokeWidth="1" />
          <line x1="25" y1="60" x2="40" y2="60" stroke="rgba(6, 182, 212, 0.15)" strokeWidth="1" />
          <line x1="25" y1="90" x2="35" y2="90" stroke="rgba(249, 115, 22, 0.2)" strokeWidth="1" />
          <line x1="25" y1="120" x2="40" y2="120" stroke="rgba(6, 182, 212, 0.15)" strokeWidth="1" />
        </svg>
      </motion.div>
    </div>
  );
};

export default FloatingElements;
