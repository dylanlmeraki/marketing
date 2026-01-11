import React from "react";
import { ArrowRight } from "lucide-react";

type FlowButtonProps = {
  text?: string;
  className?: string;
};

export function FlowButton({ text = "Our Services", className = "" }: FlowButtonProps) {
  return (
    <>
      <style>{`
        @keyframes shimmer-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* Ring shimmer: conic gradient masked to border-only */
        .shimmer-ring {
          position: absolute;
          inset: 0;
          border-radius: 14px;
          padding: 2px;                 /* ring thickness */
          opacity: 0.55;
          animation: shimmer-spin 2.2s linear infinite;
          pointer-events: none;

          background: conic-gradient(
            from 0deg,
            transparent 0deg,
            transparent 300deg,
            rgba(255,255,255,0.0) 300deg,
            var(--ring-color) 328deg,
            rgba(255,255,255,0.0) 352deg,
            transparent 360deg
          );

          /* Mask out the center so only the border "ring" shows */
          -webkit-mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }

        /* Hover glow behind the button */
        .shimmer-glow {
          position: absolute;
          inset: -10px;                 /* larger than button */
          border-radius: 18px;
          pointer-events: none;
          opacity: 0;
          filter: blur(18px);
          transform: translateZ(0);
          transition: opacity 300ms ease;

          background:
            radial-gradient(circle at 30% 30%, rgba(56,189,248,0.55), transparent 55%),
            radial-gradient(circle at 70% 70%, rgba(37,99,235,0.45), transparent 60%);

          box-shadow:
            0 0 22px rgba(56,189,248,0.35),
            0 0 44px rgba(37,99,235,0.25);
        }

        .flowbtn:hover .shimmer-glow { opacity: 1; }
        .flowbtn:hover .shimmer-ring { opacity: 0.95; }
      `}</style>

      <button
        style={
          {
            ["--ring-color" as any]: "rgba(255,255,255,0.95)",
          } as React.CSSProperties
        }
        className={`
          flowbtn group relative flex items-center gap-1 overflow-hidden
          rounded-[14px] border-[3px] border-white bg-transparent
          px-8 py-3 text-base font-bold text-white cursor-pointer
          transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)]
          hover:border-transparent hover:text-slate-900 hover:rounded-[12px]
          active:scale-[0.95]
          group-hover:[--ring-color:rgba(15,23,42,0.95)]
          ${className}
        `}
      >
        {/* Glow layer (behind everything) */}
        <span aria-hidden className="shimmer-glow -z-[1]" />

        {/* Shimmer ring layer */}
        <span aria-hidden className="shimmer-ring" />

        {/* Left arrow (arr-2) */}
        <ArrowRight
          className="absolute w-4 h-4 left-[-25%] stroke-white stroke-[2.5] fill-none z-[9]
                     group-hover:left-4 group-hover:stroke-slate-900
                     transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        />

        {/* Text */}
        <span className="relative z-[1] -translate-x-3 group-hover:translate-x-3 transition-all duration-[800ms] ease-out">
          {text}
        </span>

        {/* Circle (inverted stage: expands white on hover) */}
        <span
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                     w-4 h-4 bg-white rounded-[50%] opacity-0
                     group-hover:w-[220px] group-hover:h-[220px] group-hover:opacity-100
                     transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)]"
        />

        {/* Right arrow (arr-1) */}
        <ArrowRight
          className="absolute w-4 h-4 right-4 stroke-white stroke-[2.5] fill-none z-[9]
                     group-hover:right-[-25%] group-hover:stroke-slate-900
                     transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        />
      </button>
    </>
  );
}
