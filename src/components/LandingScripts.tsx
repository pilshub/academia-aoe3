"use client";

import { useEffect } from "react";

/**
 * Cliente: monta los efectos visuales del landing-v1-editorial.
 * Replicado 1:1 del HTML original:
 *  - Particles canvas (oro flotante)
 *  - Reveal on scroll (IntersectionObserver)
 *  - Tool-chip cursor-tracked glow
 */
export function LandingScripts() {
  useEffect(() => {
    // Reveal on scroll
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) e.target.classList.add("in");
        }
      },
      { threshold: 0.1 },
    );
    document.querySelectorAll(".landing-root .reveal").forEach((el) => io.observe(el));

    // Tool chip cursor-tracked glow
    const chipListeners: Array<{ el: HTMLElement; fn: (e: MouseEvent) => void }> = [];
    document.querySelectorAll<HTMLElement>(".landing-root .tool-chip").forEach((el) => {
      const fn = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      };
      el.addEventListener("mousemove", fn);
      chipListeners.push({ el, fn });
    });

    // Slow rising gold particles
    const canvas = document.getElementById("landing-particles") as HTMLCanvasElement | null;
    let raf = 0;
    let onResize: (() => void) | null = null;

    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        type P = { x: number; y: number; r: number; vy: number; a: number; d: number };
        let w = window.innerWidth;
        let h = window.innerHeight;
        let parts: P[] = [];

        const spawn = (initial: boolean): P => ({
          x: Math.random() * w,
          y: initial ? Math.random() * h : h + Math.random() * 40,
          r: Math.random() * 0.9 + 0.35,
          vy: -(Math.random() * 0.2 + 0.06),
          a: Math.random() * 0.35 + 0.18,
          d: Math.random() * Math.PI * 2,
        });

        const init = () => {
          parts = Array.from({ length: Math.min(60, Math.floor(w / 26)) }, () => spawn(true));
        };

        const tick = () => {
          ctx.clearRect(0, 0, w, h);
          for (const p of parts) {
            p.y += p.vy;
            p.d += 0.008;
            p.x += Math.sin(p.d) * 0.2;
            if (p.y < -10) {
              Object.assign(p, spawn(false));
              p.y = h + 10;
            }
            ctx.beginPath();
            const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
            g.addColorStop(0, `rgba(228,199,107,${p.a})`);
            g.addColorStop(1, "rgba(228,199,107,0)");
            ctx.fillStyle = g;
            ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
            ctx.fill();
          }
          raf = requestAnimationFrame(tick);
        };

        const resize = () => {
          w = window.innerWidth;
          h = window.innerHeight;
          canvas.width = w;
          canvas.height = h;
        };

        onResize = () => {
          resize();
          init();
        };

        window.addEventListener("resize", onResize);
        resize();
        init();
        tick();
      }
    }

    return () => {
      io.disconnect();
      for (const { el, fn } of chipListeners) el.removeEventListener("mousemove", fn);
      if (raf) cancelAnimationFrame(raf);
      if (onResize) window.removeEventListener("resize", onResize);
    };
  }, []);

  return null;
}
