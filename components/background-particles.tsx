"use client";

import React, { useMemo } from "react";
import { useTheme } from "@/context/ThemeContext";

interface Particle {
  id: number;
  originX: number;
  originY: number;
  driftX: number;
  driftY: number;
  size: number;
  peakOpacity: number;
  color: string;
  glowRadius: number;
  duration: number;
  delay: number;
}


const PARTICLE_COUNT = 110;

const GOLD_PALETTE = [
  "#E5A93C",
  "#D4AF37",
  "#F0C040",
  "#C9971C",
  "#ECC048",
  "#B8960C",
  "#F5C842",
];

const LIGHT_PALETTE = [
  "#7c3aed",
  "#a78bfa",
  "#6d28d9",
  "#4c1d95",
  "#8b5cf6",
];

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function generateParticles(): Particle[] {
  const rand = seededRandom(0xd4af37);

  return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    
    const size = parseFloat((rand() * 1.4 + 0.8).toFixed(2));

  
    const driftX = parseFloat((rand() * 12 - 6).toFixed(2));
    const driftY = parseFloat((rand() * 12 - 6).toFixed(2));

    const glowRadius = parseFloat((size * 3 + rand() * 5).toFixed(2));

    return {
      id: i,
      
      originX: parseFloat((rand() * 100).toFixed(3)),
      originY: parseFloat((rand() * 100).toFixed(3)),
      driftX,
      driftY,
      size,
      
      peakOpacity: parseFloat((rand() * 0.55 + 0.35).toFixed(3)), 
      color: "", 
      glowRadius,
     
      duration: parseFloat((rand() * 8 + 6).toFixed(2)),
      delay: parseFloat((rand() * -15).toFixed(2)),
    };
  });
}

function buildKeyframes(particles: Particle[]): string {
  return particles
    .map(
      (p) => `
@keyframes star-twinkle-${p.id} {
  0%, 100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.7);
  }
  20%, 80% {
    opacity: ${p.peakOpacity * 0.3};
  }
  50% {
    opacity: ${p.peakOpacity};
    transform: translate(calc(-50% + ${p.driftX}px), calc(-50% + ${p.driftY}px)) scale(1.2);
  }
}`,
    )
    .join("\n");
}

export function BackgroundParticles() {
  const { isDark } = useTheme();
  
  const particles = useMemo(() => generateParticles(), []);
  const keyframes = useMemo(() => buildKeyframes(particles), [particles]);

  const currentPalette = isDark ? GOLD_PALETTE : LIGHT_PALETTE;

  return (
    <>
      <style>{keyframes}</style>

      <div
        aria-hidden="true"
        className="fixed inset-0 -z-50 overflow-hidden bg-zinc-50 dark:bg-[#08080a] transition-colors duration-500"
      >
        {particles.map((p, index) => {
          const particleColor = currentPalette[index % currentPalette.length];

          return (
            <span
              key={p.id}
              className="absolute rounded-full pointer-events-none"
              style={{
                top: `${p.originY}%`,
                left: `${p.originX}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: particleColor,
                
               
                boxShadow: isDark
                  ? [
                      `0 0 ${p.glowRadius * 0.4}px ${p.size * 0.5}px ${particleColor}cc`,
                      `0 0 ${p.glowRadius * 1.5}px ${p.size}px ${particleColor}33`,
                    ].join(", ")
                  : [
                      `0 0 ${p.glowRadius * 0.5}px ${p.size * 0.2}px ${particleColor}33`,
                    ].join(", "),
                opacity: 0,
                animation: `star-twinkle-${p.id} ${p.duration}s ease-in-out ${p.delay}s infinite`,
                willChange: "opacity, transform",
              }}
            />
          );
        })}

      
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            background: isDark
              ? "radial-gradient(circle at center, transparent 20%, rgba(8,8,10,0.4) 60%, rgba(8,8,10,0.85) 100%)"
              : "radial-gradient(circle at center, transparent 40%, rgba(244,244,245,0.2) 80%, rgba(244,244,245,0.6) 100%)",
          }}
        />
      </div>
    </>
  );
}

export default BackgroundParticles;