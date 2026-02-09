import React, { useEffect, useRef } from "react";

interface FooterBackgroundProps {
  className?: string;
}

const FooterBackground: React.FC<FooterBackgroundProps> = ({ className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const blueprintLines = [
      { x1: 0.05, y1: 0.15, x2: 0.25, y2: 0.15 },
      { x1: 0.25, y1: 0.15, x2: 0.25, y2: 0.35 },
      { x1: 0.25, y1: 0.35, x2: 0.45, y2: 0.35 },
      { x1: 0.45, y1: 0.35, x2: 0.45, y2: 0.2 },
      { x1: 0.45, y1: 0.2, x2: 0.65, y2: 0.2 },
      { x1: 0.65, y1: 0.2, x2: 0.65, y2: 0.45 },
      { x1: 0.65, y1: 0.45, x2: 0.85, y2: 0.45 },
      { x1: 0.85, y1: 0.45, x2: 0.85, y2: 0.25 },
      { x1: 0.08, y1: 0.55, x2: 0.35, y2: 0.55 },
      { x1: 0.35, y1: 0.55, x2: 0.35, y2: 0.75 },
      { x1: 0.35, y1: 0.75, x2: 0.55, y2: 0.75 },
      { x1: 0.55, y1: 0.75, x2: 0.55, y2: 0.55 },
      { x1: 0.55, y1: 0.55, x2: 0.78, y2: 0.55 },
      { x1: 0.78, y1: 0.55, x2: 0.78, y2: 0.8 },
      { x1: 0.12, y1: 0.3, x2: 0.18, y2: 0.3 },
      { x1: 0.18, y1: 0.3, x2: 0.18, y2: 0.48 },
      { x1: 0.5, y1: 0.1, x2: 0.72, y2: 0.1 },
      { x1: 0.72, y1: 0.1, x2: 0.72, y2: 0.18 },
      { x1: 0.9, y1: 0.6, x2: 0.95, y2: 0.6 },
      { x1: 0.95, y1: 0.6, x2: 0.95, y2: 0.85 },
    ];

    let animationFrame: number;
    let time = 0;

    const animate = () => {
      time += 0.008;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      blueprintLines.forEach((line, index) => {
        const x1 = line.x1 * canvas.width;
        const y1 = line.y1 * canvas.height;
        const x2 = line.x2 * canvas.width;
        const y2 = line.y2 * canvas.height;

        const waveOffset = Math.sin(time + index * 0.4) * 0.5 + 0.5;
        const lineOpacity = 0.15 + Math.sin(time * 0.5 + index * 0.3) * 0.1;
        const strokeWidth = 1 + Math.sin(time * 0.3 + index * 0.5) * 0.5;
        const segments = 40;

        for (let i = 0; i < segments; i++) {
          const t1 = i / segments;
          const t2 = (i + 1) / segments;

          const px1 = x1 + (x2 - x1) * t1;
          const py1 = y1 + (y2 - y1) * t1;
          const px2 = x1 + (x2 - x1) * t2;
          const py2 = y1 + (y2 - y1) * t2;

          const fadeWave = Math.sin((t1 - waveOffset) * Math.PI * 2);
          const opacity = Math.max(0, Math.min(1, fadeWave * 0.5 + 0.5));

          const shimmer = Math.sin(time * 2.5 + i * 0.25) * 0.4 + 0.6;
          const finalOpacity = opacity * shimmer * lineOpacity;

          ctx.beginPath();
          ctx.moveTo(px1, py1);
          ctx.lineTo(px2, py2);
          
          const cyanAmount = Math.sin(t1 * Math.PI + time) * 0.5 + 0.5;
          const r = Math.round(6 + (249 - 6) * (1 - cyanAmount));
          const g = Math.round(182 + (115 - 182) * (1 - cyanAmount));
          const b = Math.round(212 + (22 - 212) * (1 - cyanAmount));
          
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${finalOpacity})`;
          ctx.lineWidth = strokeWidth;
          ctx.lineCap = "round";
          ctx.stroke();

          if (finalOpacity > 0.5) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${(finalOpacity - 0.5) * 0.4})`;
            ctx.lineWidth = strokeWidth + 1;
            ctx.stroke();
          }
        }
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ mixBlendMode: "screen" }}
    />
  );
};

export default FooterBackground;
