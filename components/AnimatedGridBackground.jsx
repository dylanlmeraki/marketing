import React, { useEffect, useRef, useState } from "react";

const AnimatedGridBackground = ({
  gridSize = 40,
  animationDuration = 2000,
  triggerInterval = 400,
  offsetX = 0,
  offsetY = 0,
  baseOpacity = 1,
  zIndex = 0,
  movingOffset = false,
  className = "",
}) => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const cellsRef = useRef([]);
  const animationFrameRef = useRef();
  const lastTriggerRef = useRef(0);
  const startTimeRef = useRef(null);

  const GRID_SIZE = gridSize;
  const CELL_PADDING = 2;
  const ANIMATION_DURATION = animationDuration;
  const TRIGGER_INTERVAL = triggerInterval;
  const CORNER_RADIUS_CHANCE = 0.05;

  useEffect(() => {
    const updateDimensions = () => {
      if (!canvasRef.current) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      setDimensions({ width, height });
      canvasRef.current.width = width;
      canvasRef.current.height = height;
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (!dimensions.width || !dimensions.height) return;

    const cols = Math.ceil(dimensions.width / GRID_SIZE);
    const rows = Math.ceil(dimensions.height / GRID_SIZE);

    cellsRef.current = [];
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        cellsRef.current.push({
          x,
          y,
          isAnimating: false,
          scale: 0,
          opacity: 0,
          animationStart: 0,
        });
      }
    }
  }, [dimensions.width, dimensions.height, GRID_SIZE]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const drawRoundedRect = (x, y, width, height, radius) => {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
    };

    const animate = (timestamp) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      if (baseOpacity === 1) {
        ctx.fillStyle = "hsl(220, 13%, 9%)";
        ctx.fillRect(0, 0, dimensions.width, dimensions.height);
      }

      const cols = Math.ceil(dimensions.width / GRID_SIZE);
      const rows = Math.ceil(dimensions.height / GRID_SIZE);

      let currentOffsetX = offsetX;
      let currentOffsetY = offsetY;

      if (movingOffset) {
        const elapsed = (timestamp - startTimeRef.current) / 1000;
        currentOffsetX = offsetX + Math.sin(elapsed * 0.1) * 20;
        currentOffsetY = offsetY + Math.cos(elapsed * 0.1) * 20;
      }

      ctx.strokeStyle = `rgba(100, 150, 200, ${0.08 * baseOpacity})`;
      ctx.lineWidth = 1;

      for (let x = 0; x <= cols; x += 1) {
        ctx.beginPath();
        ctx.moveTo(x * GRID_SIZE + currentOffsetX, 0);
        ctx.lineTo(x * GRID_SIZE + currentOffsetX, dimensions.height);
        ctx.stroke();
      }

      for (let y = 0; y <= rows; y += 1) {
        ctx.beginPath();
        ctx.moveTo(0, y * GRID_SIZE + currentOffsetY);
        ctx.lineTo(dimensions.width, y * GRID_SIZE + currentOffsetY);
        ctx.stroke();
      }

      if (timestamp - lastTriggerRef.current > TRIGGER_INTERVAL) {
        const randomIndex = Math.floor(Math.random() * cellsRef.current.length);
        const cell = cellsRef.current[randomIndex];
        if (!cell.isAnimating) {
          cell.isAnimating = true;
          cell.animationStart = timestamp;
        }
        lastTriggerRef.current = timestamp;
      }

      cellsRef.current.forEach((cell) => {
        if (cell.isAnimating) {
          const elapsed = timestamp - cell.animationStart;
          const progress = Math.min(elapsed / ANIMATION_DURATION, 1);

          if (progress < 0.5) {
            cell.scale = progress * 2;
            cell.opacity = progress * 2;
          } else {
            cell.scale = 1 - (progress - 0.5) * 2;
            cell.opacity = 1 - (progress - 0.5) * 2;
          }

          if (progress >= 1) {
            cell.isAnimating = false;
            cell.scale = 0;
            cell.opacity = 0;
          }

          if (cell.scale > 0) {
            const x = cell.x * GRID_SIZE + CELL_PADDING + currentOffsetX;
            const y = cell.y * GRID_SIZE + CELL_PADDING + currentOffsetY;
            const size = GRID_SIZE - CELL_PADDING * 2;
            const scaledSize = size * cell.scale;
            const offset = (size - scaledSize) / 2;

            const hasRoundedCorners = Math.random() < CORNER_RADIUS_CHANCE;
            const cornerRadius = hasRoundedCorners ? scaledSize : 0;

            const hue = 200 + Math.random() * 20;
            const saturation = 70 + Math.random() * 20;
            const lightness = 50 + Math.random() * 20;

            ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${cell.opacity * 0.9 * baseOpacity})`;
            ctx.shadowColor = `hsla(${hue}, ${saturation}%, ${lightness}%, ${cell.opacity * baseOpacity})`;
            ctx.shadowBlur = 15 * cell.opacity * baseOpacity;

            if (hasRoundedCorners) {
              drawRoundedRect(x + offset, y + offset, scaledSize, scaledSize, cornerRadius);
              ctx.fill();
            } else {
              ctx.fillRect(x + offset, y + offset, scaledSize, scaledSize);
            }

            ctx.shadowBlur = 0;
          }
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [
    ANIMATION_DURATION,
    GRID_SIZE,
    TRIGGER_INTERVAL,
    baseOpacity,
    dimensions.height,
    dimensions.width,
    movingOffset,
    offsetX,
    offsetY,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{
        background: baseOpacity === 1 ? "hsl(220, 13%, 9%)" : "transparent",
        zIndex,
      }}
    />
  );
};

export default AnimatedGridBackground;
