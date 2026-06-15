import { useRef, useState, useCallback } from "react";

interface CharState {
  dx: number;
  dy: number;
  scale: number;
  rotation: number;
}

const INFLUENCE_RADIUS = 120;
const MAX_PUSH = 28;
const MAX_ROTATE = 18;

export function useWarpEffect(text: string) {
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const [charStates, setCharStates] = useState<CharState[]>(
    () => text.split("").map(() => ({ dx: 0, dy: 0, scale: 1, rotation: 0 }))
  );

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    animFrameRef.current = requestAnimationFrame(() => {
      const mx = e.clientX;
      const my = e.clientY;

      const newStates = charRefs.current.map((el) => {
        if (!el) return { dx: 0, dy: 0, scale: 1, rotation: 0 };

        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        const distX = mx - cx;
        const distY = my - cy;
        const dist = Math.sqrt(distX * distX + distY * distY);

        if (dist > INFLUENCE_RADIUS) {
          return { dx: 0, dy: 0, scale: 1, rotation: 0 };
        }

        const force = 1 - dist / INFLUENCE_RADIUS;
        const angle = Math.atan2(distY, distX);

        return {
          dx: -Math.cos(angle) * force * MAX_PUSH,
          dy: -Math.sin(angle) * force * MAX_PUSH,
          scale: 1 + force * 0.25,
          rotation: Math.sin(angle) * force * MAX_ROTATE,
        };
      });

      setCharStates(newStates);
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setCharStates(text.split("").map(() => ({ dx: 0, dy: 0, scale: 1, rotation: 0 })));
  }, [text]);

  return { charRefs, charStates, handleMouseMove, handleMouseLeave };
}

export default function WarpName({ children }: { children: string }) {
  const { charRefs, charStates, handleMouseMove, handleMouseLeave } = useWarpEffect(children);

  return (
    <span 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-flex cursor-default"
    >
      {children.split("").map((char, i) => {
        const state = charStates[i];
        return (
          <span
            key={i}
            ref={(el) => {
              charRefs.current[i] = el;
            }}
            style={{
              display: "inline-block",
              transform: `translate(${state.dx}px, ${state.dy}px) scale(${state.scale}) rotate(${state.rotation}deg)`,
              transition: "transform 0.1s ease-out",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}
    </span>
  );
}