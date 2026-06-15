import { useState, useEffect, useRef } from "react";
import { useCursor } from "~/hooks/useCursor";

const L = 8;
const T = 1.5;

function Corner({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const isLeft = position === "tl" || position === "bl";
  const isTop  = position === "tl" || position === "tr";

  return (
    <g>
      <rect x={isLeft ? 0 : -L} y={isTop ? 0 : -T} width={L} height={T} fill="rgba(215,217,206,0.9)" />
      <rect x={isLeft ? 0 : -T} y={isTop ? 0 : -L} width={T} height={L} fill="rgba(215,217,206,0.9)" />
    </g>
  );
}

export default function Cursor() {
  const cursor = useCursor();

  // animatedWidth/Height drive the corner positions smoothly
  const [animW, setAnimW] = useState(cursor.width);
  const [animH, setAnimH] = useState(cursor.height);
  const rafRef = useRef<number | null>(null);
  const targetW = useRef(cursor.width);
  const targetH = useRef(cursor.height);
  const currentW = useRef(cursor.width);
  const currentH = useRef(cursor.height);

  useEffect(() => {
    targetW.current = cursor.width;
    targetH.current = cursor.height;
  }, [cursor.width, cursor.height]);

  useEffect(() => {
    const SPEED = 0.5; // lower = slower/smoother animation

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    function tick() {
      currentW.current = lerp(currentW.current, targetW.current, SPEED);
      currentH.current = lerp(currentH.current, targetH.current, SPEED);

      setAnimW(currentW.current);
      setAnimH(currentH.current);

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  const pad = L;
  const svgW = animW + pad * 2;
  const svgH = animH + pad * 2;

  // Offset so the expansion originates from the entry side
  const offsetX = cursor.hovered
    ? cursor.expandFrom === "left"
      ? (cursor.width - animW) / 2 - (cursor.width - animW) / 2   // anchored left: no shift
      : (cursor.width - animW) / 2                                  // anchored right: shift right
    : 0;

  // Entry-side anchor: corners spread out from left or right
  const anchorOffsetX = cursor.hovered
    ? cursor.expandFrom === "left"
      ? 0
      : cursor.width - animW
    : 0;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
        pointerEvents: "none",
        // Position centers on rectX/rectY always
        transform: `translate(${cursor.rectX - cursor.width / 2 - pad + anchorOffsetX}px, ${cursor.rectY - cursor.height / 2 - pad}px)`,
        opacity: cursor.opacity,
        transition: "opacity 0.3s ease",
        width: svgW,
        height: svgH,
      }}
    >
      <svg
        width={svgW}
        height={svgH}
        style={{
          transformOrigin: "center center",
          animation: cursor.spinning ? "cursor-spin 3s linear infinite" : "none",
          overflow: "visible",
        }}
        overflow="visible"
      >
        {/* TL */}
        <g transform={`translate(${pad}, ${pad})`}>
          <Corner position="tl" />
        </g>
        {/* TR */}
        <g transform={`translate(${pad + animW}, ${pad})`}>
          <Corner position="tr" />
        </g>
        {/* BL */}
        <g transform={`translate(${pad}, ${pad + animH})`}>
          <Corner position="bl" />
        </g>
        {/* BR */}
        <g transform={`translate(${pad + animW}, ${pad + animH})`}>
          <Corner position="br" />
        </g>

        {/* Dot at center */}
        <circle
          cx={pad + animW / 2}
          cy={pad + animH / 2}
          r={2}
          fill="rgba(215,217,206,1)"
        />
      </svg>
    </div>
  );
}