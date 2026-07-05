"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;

  homeX: number;
  homeY: number;

  vx: number;
  vy: number;

  color: string;
  size: number;
}

export default function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    ctx.scale(dpr, dpr);

    const mouse = {
      x: -9999,
      y: -9999,
    };

    const PARTICLES = 200;
    const LINK_DISTANCE = 110;
    const REPULSE_RADIUS = 120;
    const REPULSE_FORCE = 8;
    const SPRING = 0.005;
    const DAMPING = 0.5;
    const CONNECTION_PROBABILITY = 0.15;

    const particles: Particle[] = [];
    const connections: Set<string> = new Set();

    function createParticles() {
      particles.length = 0;
      connections.clear();

      for (let i = 0; i < PARTICLES; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;

        // Generate random color
        // const hue = Math.random() * 360;
        // const saturation = 20 + Math.random() * 30;
        // const lightness = 25 + Math.random() * 25;
        // const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        const color = "rgb(255,255,255, 0.5)"

        // Generate random size
        const size = 1 + Math.random() * 3;

        particles.push({
          x,
          y,
          homeX: x,
          homeY: y,
          vx: 0,
          vy: 0,
          color,
          size,
        });
      }

      // Initialize connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.homeX - b.homeX;
          const dy = a.homeY - b.homeY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < LINK_DISTANCE && Math.random() < CONNECTION_PROBABILITY) {
            connections.add(`${i},${j}`);
          }
        }
      }
    }

    createParticles();

    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Add glow effect in the middle
      const centerX = width / 2;
      const centerY = height / 2;
      const glowRadius = Math.max(width, height) * 0.4;

      const glowGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        glowRadius
      );
      glowGradient.addColorStop(0, "rgba(100, 150, 255, 0.1)");
      glowGradient.addColorStop(0.5, "rgba(100, 150, 255, 0.05)");
      glowGradient.addColorStop(1, "rgba(100, 150, 255, 0)");

      ctx.fillStyle = glowGradient;
      ctx.fillRect(0, 0, width, height);

      for (const p of particles) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;

        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < REPULSE_RADIUS) {
          const force = (REPULSE_RADIUS - dist) / REPULSE_RADIUS;

          const angle = Math.atan2(dy, dx);

          p.vx += Math.cos(angle) * force * REPULSE_FORCE;
          p.vy += Math.sin(angle) * force * REPULSE_FORCE;
        }

        p.vx += (p.homeX - p.x) * SPRING;
        p.vy += (p.homeY - p.y) * SPRING;

        p.vx *= DAMPING;
        p.vy *= DAMPING;

        p.x += p.vx;
        p.y += p.vy;
      }

      ctx.lineWidth = 1;

      // Draw stored connections
      for (const connection of connections) {
        const [i, j] = connection.split(',').map(Number);
        const a = particles[i];
        const b = particles[j];

        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        ctx.strokeStyle = `rgba(128, 128 , 128, ${
          1 - dist / LINK_DISTANCE
        })`;

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      for (const p of particles) {
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(animate);
    }

    animate();

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = width + "px";
      canvas.style.height = height + "px";

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      createParticles();
    }

    function move(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }

    function leave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 w-screen opacity-50 blur-[0.75px]"
    />
  );
}