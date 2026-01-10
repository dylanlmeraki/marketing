import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * AnimatedGridBackground
 * - Absolute positioned background meant to sit inside a `relative` hero container.
 * - Use `className="absolute inset-0 opacity-50 pointer-events-none"` on the wrapper where you mount it
 *   if you want 50% opacity and to keep it from blocking clicks.
 */

const DEFAULT_COLORS = [
  "from-blue-500/80 to-blue-600/80",
  "from-cyan-500/80 to-cyan-600/80",
  "from-slate-400/80 to-slate-500/80",
  "from-blue-400/80 to-cyan-500/80",
  "from-cyan-400/80 to-blue-500/80",
];

function getRandomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function AnimatedGridBackground({
  rows = 12,
  cols = 20,
  curvedPercentage = 5,
  animationInterval = 800,
  maxActiveSquares = 8,
  backgroundRows = 24,
  backgroundCols = 40,
  backgroundInterval = 2400,
  maxBackgroundActive = 3,
  className = "",
}) {
  const colors = useMemo(() => DEFAULT_COLORS, []);

  const [squares, setSquares] = useState([]);
  const [activeSquares, setActiveSquares] = useState(() => new Set());

  const [backgroundSquares, setBackgroundSquares] = useState([]);
  const [activeBackgroundSquares, setActiveBackgroundSquares] = useState(() => new Set());

  useEffect(() => {
    const totalSquares = rows * cols;
    const curvedCount = Math.floor((totalSquares * curvedPercentage) / 100);
    const curvedIndices = new Set();

    while (curvedIndices.size < curvedCount) {
      curvedIndices.add(Math.floor(Math.random() * totalSquares));
    }

    const initialSquares = [];
    let index = 0;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        initialSquares.push({
          id: `fg-${row}-${col}`,
          row,
          col,
          isCurved: curvedIndices.has(index),
          color: getRandomFrom(colors),
        });
        index++;
      }
    }
    setSquares(initialSquares);

    const initialBackgroundSquares = [];
    for (let row = 0; row < backgroundRows; row++) {
      for (let col = 0; col < backgroundCols; col++) {
        initialBackgroundSquares.push({
          id: `bg-${row}-${col}`,
          row,
          col,
          color: getRandomFrom(colors),
        });
      }
    }
    setBackgroundSquares(initialBackgroundSquares);
  }, [rows, cols, curvedPercentage, backgroundRows, backgroundCols, colors]);

  // Foreground grid animation
  useEffect(() => {
    const interval = setInterval(() => {
      const inactiveSquares = squares.filter((sq) => !activeSquares.has(sq.id));
      const inactiveCurved = inactiveSquares.filter((sq) => sq.isCurved);
      const inactiveRegular = inactiveSquares.filter((sq) => !sq.isCurved);

      const newActiveIds = new Set(activeSquares);

      // Activate regular squares more frequently
      if (inactiveRegular.length > 0) {
        const numToActivate = Math.min(
          Math.floor(Math.random() * 3) + 1,
          maxActiveSquares - activeSquares.size
        );

        for (let i = 0; i < numToActivate; i++) {
          if (inactiveRegular.length > 0) {
            const randomIndex = Math.floor(Math.random() * inactiveRegular.length);
            const selectedSquare = inactiveRegular.splice(randomIndex, 1)[0];
            if (selectedSquare) newActiveIds.add(selectedSquare.id);
          }
        }
      }

      // Activate circles less frequently (30% chance)
      if (inactiveCurved.length > 0 && Math.random() < 0.3) {
        const randomIndex = Math.floor(Math.random() * inactiveCurved.length);
        const selectedCircle = inactiveCurved[randomIndex];
        if (selectedCircle) newActiveIds.add(selectedCircle.id);
      }

      setActiveSquares(newActiveIds);

      setTimeout(() => {
        setActiveSquares((prev) => {
          const updated = new Set(prev);
          newActiveIds.forEach((id) => {
            if (!prev.has(id) || Math.random() > 0.3) updated.delete(id);
          });
          return updated;
        });
      }, animationInterval);
    }, animationInterval);

    return () => clearInterval(interval);
  }, [squares, activeSquares, animationInterval, maxActiveSquares]);

  // Background grid animation (slower, less frequent)
  useEffect(() => {
    const interval = setInterval(() => {
      const inactive = backgroundSquares.filter((sq) => !activeBackgroundSquares.has(sq.id));
      if (inactive.length === 0) return;

      const numToActivate = Math.min(
        Math.floor(Math.random() * 2) + 1,
        maxBackgroundActive - activeBackgroundSquares.size
      );

      const newActiveIds = new Set(activeBackgroundSquares);
      for (let i = 0; i < numToActivate; i++) {
        if (inactive.length === 0) break;
        const randomIndex = Math.floor(Math.random() * inactive.length);
        const selected = inactive.splice(randomIndex, 1)[0];
        if (selected) newActiveIds.add(selected.id);
      }

      setActiveBackgroundSquares(newActiveIds);

      setTimeout(() => {
        setActiveBackgroundSquares((prev) => {
          const updated = new Set(prev);
          newActiveIds.forEach((id) => {
            if (!prev.has(id) || Math.random() > 0.3) updated.delete(id);
          });
          return updated;
        });
      }, backgroundInterval);
    }, backgroundInterval);

    return () => clearInterval(interval);
  }, [backgroundSquares, activeBackgroundSquares, backgroundInterval, maxBackgroundActive]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`.trim()} aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/20 via-background to-blue-950/20" />

      {/* Background grid layer - larger, more opaque, slower */}
      <div
        className="absolute grid gap-[2px] p-4"
        style={{
          gridTemplateColumns: `repeat(${backgroundCols / 2}, 1fr)`,
          gridTemplateRows: `repeat(${backgroundRows / 2}, 1fr)`,
          left: "20%",
          top: "20%",
          width: "100%",
          height: "100%",
        }}
      >
        {backgroundSquares.map((square) => {
          const isActive = activeBackgroundSquares.has(square.id);
          return (
            <AnimatePresence key={square.id}>
              {isActive ? (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.9 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={`w-full h-full bg-gradient-to-br ${square.color} shadow-lg`}
                />
              ) : (
                <div className="w-full h-full border border-cyan-900/20 bg-background/70 rounded-none" />
              )}
            </AnimatePresence>
          );
        })}
      </div>

      {/* Foreground grid layer - smaller, varying colors */}
      <div
        className="relative w-full h-full grid gap-[1px] p-4"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {squares.map((square) => {
          const isActive = activeSquares.has(square.id);
          return (
            <div key={square.id} className="relative" style={{ fontFamily: "monospace" }}>
              <div
                className={`w-full h-full border border-cyan-900/30 bg-background/50 transition-all duration-200 ${
                  square.isCurved ? "rounded-full" : "rounded-none"
                }`}
              />
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={`absolute inset-0 bg-gradient-to-br ${square.color} shadow-lg ${
                      square.isCurved ? "rounded-full" : "rounded-none"
                    }`}
                    style={{
                      boxShadow: square.isCurved
                        ? "0 0 20px rgba(6, 182, 212, 0.5)"
                        : "0 0 15px rgba(59, 130, 246, 0.4)",
                    }}
                  />
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
