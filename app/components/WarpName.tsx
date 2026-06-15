import { useWarpEffect } from "~/hooks/useWarpEffect";

interface WarpNameProps {
  children: string;
}

export default function WarpName({ children }: WarpNameProps) {
  const { charRefs, charStates, handleMouseMove, handleMouseLeave } = useWarpEffect(children);

  return (
    <span
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ display: "inline-flex", cursor: "default" }}
    >
      {children.split("").map((char, i) => {
        const state = charStates[i] ?? { dx: 0, dy: 0, scale: 1, rotation: 0 };
        return (
          <span
            key={i}
            ref={(el) => { charRefs.current[i] = el; }}
            style={{
              display: "inline-block",
              transform: `translate(${state.dx}px, ${state.dy}px) scale(${state.scale}) rotate(${state.rotation}deg)`,
              transition: "transform 0.15s cubic-bezier(0.23, 1, 0.32, 1)",
              willChange: "transform",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}
    </span>
  );
}