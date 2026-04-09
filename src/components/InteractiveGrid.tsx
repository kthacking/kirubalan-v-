import React, { useState, useEffect, useRef } from "react";

const InteractiveGrid = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseenter", () => setIsHovering(true));
      container.addEventListener("mouseleave", () => setIsHovering(false));
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-auto overflow-hidden bg-[#050505]"
      style={{ willChange: "contents" }}
    >
      {/* 🟦 Soft Ambient Background Glow */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          opacity: isHovering ? 0.3 : 0,
          background: `
            radial-gradient(
              1000px circle at ${mousePos.x}px ${mousePos.y}px,
              rgba(255, 60, 0, 0.1),
              transparent 70%
            )
          `,
          willChange: "opacity, background",
        }}
      />

      {/* 🔥 The "Fiery" Underlayer (The source of the glow) */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: isHovering ? 1 : 0.2,
          background: `
            radial-gradient(
              250px circle at ${mousePos.x}px ${mousePos.y}px,
              rgba(255, 140, 0, 0.8) 0%,
              rgba(255, 60, 0, 0.4) 30%,
              rgba(255, 30, 0, 0.1) 60%,
              transparent 100%
            )
          `,
          filter: isHovering ? 'blur(2px)' : 'none', // Reduce blur load when idle
          willChange: "opacity, background",
        }}
      />

      {/* ⬛ Grid Mask (The boxes that sit on top) */}
      <div
        className="absolute inset-0 z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='6' y='6' width='108' height='108' rx='24' fill='%23080808'/%3E%3C/svg%3E")`,
          backgroundSize: '120px 120px',
          backgroundRepeat: 'repeat',
        }}
      />

      {/* ✨ Spotlight Highlight (Adds gloss to box edges) */}
      <div
        className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `
            radial-gradient(
              400px circle at ${mousePos.x}px ${mousePos.y}px,
              rgba(255, 255, 255, 0.05) 0%,
              transparent 100%
            )
          `,
          maskImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='6' y='6' width='108' height='108' rx='24' fill='none' stroke='white' stroke-width='1'/%3E%3C/svg%3E")`,
          WebkitMaskImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='6' y='6' width='108' height='108' rx='24' fill='none' stroke='white' stroke-width='1'/%3E%3C/svg%3E")`,
          maskRepeat: 'repeat',
          WebkitMaskRepeat: 'repeat',
          willChange: "opacity, background",
        }}
      />

      {/* 🌌 Large Rays / Fog Layer */}
      <div
        className="absolute inset-0 z-30 pointer-events-none transition-opacity duration-700"
        style={{
          opacity: isHovering ? 0.4 : 0,
          background: `
            radial-gradient(
              1200px circle at ${mousePos.x}px ${mousePos.y}px,
              rgba(255, 100, 0, 0.05),
              transparent 80%
            )
          `,
          filter: isHovering ? 'blur(40px)' : 'none',
          mixBlendMode: 'screen',
          willChange: "opacity, background",
        }}
      />
    </div>
  );
};

export default InteractiveGrid;
