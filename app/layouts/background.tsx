import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

const FIELD_WIDTH = 3000;
const FIELD_HEIGHT = 2000;
const NUM_STARS = 180;
const CAMERA_SPEED = 0.12;
const MOUSE_RADIUS = 100;  // px — only stars within this distance react
const MOUSE_PUSH = 5;     // max displacement

export default function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const stars: Star[] = Array.from({ length: NUM_STARS }, () => ({
      x: Math.random() * FIELD_WIDTH,
      y: Math.random() * FIELD_HEIGHT,
      size: Math.random() * 1.6 + 0.2,
      opacity: Math.random() * 0.5 + 0.4,
      twinkleSpeed: Math.random() * 0.018 + 0.004,
      twinkleOffset: Math.random() * Math.PI * 2,
    }));

    let camX = 0;
    let mouseX = -9999;
    let mouseY = -9999;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    let t = 0;
    let animId: number;

    function draw() {
      t++;
      camX = (camX + CAMERA_SPEED) % FIELD_WIDTH;

      ctx!.clearRect(0, 0, width, height);

      for (const star of stars) {
        // Base screen position from camera
        let sx = ((star.x - camX + FIELD_WIDTH) % FIELD_WIDTH / FIELD_WIDTH) * width;
        let sy = (star.y / FIELD_HEIGHT) * height;

        // Mouse repulsion — only within MOUSE_RADIUS
        const dx = sx - mouseX;
        const dy = sy - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (1 - dist / MOUSE_RADIUS);
          const angle = Math.atan2(dy, dx);
          sx += Math.cos(angle) * force * MOUSE_PUSH;
          sy += Math.sin(angle) * force * MOUSE_PUSH;
        }

        // Twinkle
        const twinkle = 0.5 + 0.5 * Math.sin(t * star.twinkleSpeed + star.twinkleOffset);
        const alpha = star.opacity * (0.6 + 0.4 * twinkle);

        // Glow
        const glowR = star.size * 4;
        const glow = ctx!.createRadialGradient(sx, sy, 0, sx, sy, glowR);
        glow.addColorStop(0, `rgba(220, 225, 215, ${alpha * 0.85})`);
        glow.addColorStop(0.35, `rgba(200, 210, 220, ${alpha * 0.25})`);
        glow.addColorStop(1, `rgba(180, 195, 215, 0)`);

        ctx!.beginPath();
        ctx!.arc(sx, sy, glowR, 0, Math.PI * 2);
        ctx!.fillStyle = glow;
        ctx!.fill();

        // Core
        ctx!.beginPath();
        ctx!.arc(sx, sy, star.size * 0.55, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx!.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    draw();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}