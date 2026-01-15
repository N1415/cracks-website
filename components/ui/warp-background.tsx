"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import React, { HTMLAttributes, useState, useEffect } from "react";

interface WarpBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  perspective?: number;
  beamsPerSide?: number;
  beamSize?: number;
  beamDelayMax?: number;
  beamDelayMin?: number;
  beamDuration?: number;
  gridColor?: string;
  gridColorDark?: string;
  beamColor?: string;
}

interface BeamData {
  x: number;
  delay: number;
  aspectRatio: number;
  colorIndex: number;
}

const warmColors = [
  "hsl(40, 60%, 70%)",
  "hsl(35, 50%, 65%)",
  "hsl(45, 55%, 75%)",
  "hsl(30, 45%, 60%)",
  "hsl(38, 40%, 68%)",
];

const Beam = ({
  width,
  x,
  delay,
  duration,
  color,
  aspectRatio,
  colorIndex,
}: {
  width: string | number;
  x: string | number;
  delay: number;
  duration: number;
  color?: string;
  aspectRatio: number;
  colorIndex: number;
}) => {
  const beamColor = color || warmColors[colorIndex];

  return (
    <motion.div
      style={
        {
          "--x": `${x}`,
          "--width": `${width}`,
          "--aspect-ratio": `${aspectRatio}`,
          "--background": `linear-gradient(${beamColor}, transparent)`,
        } as React.CSSProperties
      }
      className={`absolute left-[var(--x)] top-0 [aspect-ratio:1/var(--aspect-ratio)] [background:var(--background)] [width:var(--width)]`}
      initial={{ y: "100cqmax", x: "-50%" }}
      animate={{ y: "-100%", x: "-50%" }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
};

export const WarpBackground: React.FC<WarpBackgroundProps> = ({
  children,
  perspective = 100,
  className,
  beamsPerSide = 3,
  beamSize = 5,
  beamDelayMax = 3,
  beamDelayMin = 0,
  beamDuration = 3,
  gridColor = "hsl(35, 20%, 85%)",
  gridColorDark = "hsl(35, 20%, 25%)",
  beamColor,
  ...props
}) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [beams, setBeams] = useState<{
    top: BeamData[];
    right: BeamData[];
    bottom: BeamData[];
    left: BeamData[];
  }>({ top: [], right: [], bottom: [], left: [] });

  useEffect(() => {
    const generateBeams = (): BeamData[] => {
      const result: BeamData[] = [];
      const cellsPerSide = Math.floor(100 / beamSize);
      const step = cellsPerSide / beamsPerSide;

      for (let i = 0; i < beamsPerSide; i++) {
        const x = Math.floor(i * step);
        const delay = Math.random() * (beamDelayMax - beamDelayMin) + beamDelayMin;
        const aspectRatio = Math.floor(Math.random() * 10) + 1;
        const colorIndex = Math.floor(Math.random() * warmColors.length);
        result.push({ x, delay, aspectRatio, colorIndex });
      }
      return result;
    };

    setBeams({
      top: generateBeams(),
      right: generateBeams(),
      bottom: generateBeams(),
      left: generateBeams(),
    });
    setMounted(true);
  }, [beamsPerSide, beamSize, beamDelayMax, beamDelayMin]);

  const currentGridColor = resolvedTheme === "dark" ? gridColorDark : gridColor;

  return (
    <div className={cn("relative", className)} {...props}>
      <div
        style={
          {
            "--perspective": `${perspective}px`,
            "--grid-color": currentGridColor,
            "--beam-size": `${beamSize}%`,
          } as React.CSSProperties
        }
        className={
          "pointer-events-none absolute left-0 top-0 size-full overflow-hidden [clip-path:inset(0)] [container-type:size] [perspective:var(--perspective)] [transform-style:preserve-3d]"
        }
      >
        {/* top side */}
        <div className="absolute [transform-style:preserve-3d] [background-size:var(--beam-size)_var(--beam-size)] [background:linear-gradient(var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_-0.5px_/var(--beam-size)_var(--beam-size),linear-gradient(90deg,_var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_50%_/var(--beam-size)_var(--beam-size)] [container-type:inline-size] [height:100cqmax] [transform-origin:50%_0%] [transform:rotateX(-90deg)] [width:100cqi]">
          {mounted &&
            beams.top.map((beam, index) => (
              <Beam
                key={`top-${index}`}
                width={`${beamSize}%`}
                x={`${beam.x * beamSize}%`}
                delay={beam.delay}
                duration={beamDuration}
                color={beamColor}
                aspectRatio={beam.aspectRatio}
                colorIndex={beam.colorIndex}
              />
            ))}
        </div>
        {/* bottom side */}
        <div className="absolute top-full [transform-style:preserve-3d] [background-size:var(--beam-size)_var(--beam-size)] [background:linear-gradient(var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_-0.5px_/var(--beam-size)_var(--beam-size),linear-gradient(90deg,_var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_50%_/var(--beam-size)_var(--beam-size)] [container-type:inline-size] [height:100cqmax] [transform-origin:50%_0%] [transform:rotateX(-90deg)] [width:100cqi]">
          {mounted &&
            beams.bottom.map((beam, index) => (
              <Beam
                key={`bottom-${index}`}
                width={`${beamSize}%`}
                x={`${beam.x * beamSize}%`}
                delay={beam.delay}
                duration={beamDuration}
                color={beamColor}
                aspectRatio={beam.aspectRatio}
                colorIndex={beam.colorIndex}
              />
            ))}
        </div>
        {/* left side */}
        <div className="absolute left-0 top-0 [transform-style:preserve-3d] [background-size:var(--beam-size)_var(--beam-size)] [background:linear-gradient(var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_-0.5px_/var(--beam-size)_var(--beam-size),linear-gradient(90deg,_var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_50%_/var(--beam-size)_var(--beam-size)] [container-type:inline-size] [height:100cqmax] [transform-origin:0%_0%] [transform:rotate(90deg)_rotateX(-90deg)] [width:100cqh]">
          {mounted &&
            beams.left.map((beam, index) => (
              <Beam
                key={`left-${index}`}
                width={`${beamSize}%`}
                x={`${beam.x * beamSize}%`}
                delay={beam.delay}
                duration={beamDuration}
                color={beamColor}
                aspectRatio={beam.aspectRatio}
                colorIndex={beam.colorIndex}
              />
            ))}
        </div>
        {/* right side */}
        <div className="absolute right-0 top-0 [transform-style:preserve-3d] [background-size:var(--beam-size)_var(--beam-size)] [background:linear-gradient(var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_-0.5px_/var(--beam-size)_var(--beam-size),linear-gradient(90deg,_var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_50%_/var(--beam-size)_var(--beam-size)] [container-type:inline-size] [height:100cqmax] [width:100cqh] [transform-origin:100%_0%] [transform:rotate(-90deg)_rotateX(-90deg)]">
          {mounted &&
            beams.right.map((beam, index) => (
              <Beam
                key={`right-${index}`}
                width={`${beamSize}%`}
                x={`${beam.x * beamSize}%`}
                delay={beam.delay}
                duration={beamDuration}
                color={beamColor}
                aspectRatio={beam.aspectRatio}
                colorIndex={beam.colorIndex}
              />
            ))}
        </div>
        {/* Radial vignette fade overlay */}
        <div className="absolute inset-0 pointer-events-none [background:radial-gradient(ellipse_80%_50%_at_50%_50%,_transparent_40%,_white_100%)] dark:[background:radial-gradient(ellipse_80%_50%_at_50%_50%,_transparent_40%,_#2c2c2c_100%)]" />
        {/* Center white/dark fade overlay */}
        <div className="absolute inset-0 pointer-events-none [background:radial-gradient(ellipse_70%_50%_at_50%_50%,_rgba(255,255,255,0.6)_0%,_transparent_70%)] dark:[background:radial-gradient(ellipse_70%_50%_at_50%_50%,_rgba(44,44,44,0.6)_0%,_transparent_70%)]" />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
};
