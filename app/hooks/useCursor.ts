import { useEffect, useRef, useState } from "react";

export interface CursorState {
  dotX: number;
  dotY: number;
  rectX: number;
  rectY: number;
  width: number;
  height: number;
  spinning: boolean;
  expandFrom: "left" | "right";
  hovered: boolean;
  opacity: number;
}

export function useCursor() {
  const [cursor, setCursor] = useState<CursorState>({
    dotX: -100,
    dotY: -100,
    rectX: -100,
    rectY: -100,
    width: 20,
    height: 20,
    spinning: true,
    expandFrom: "left",
    hovered: false,
    opacity: 0,
  });

  const hoveredRef = useRef(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      // Hide custom cursor inside no-custom-cursor zones (e.g. file explorer)
      const noCursorZone = (e.target as HTMLElement).closest("[data-no-custom-cursor]");
      if (noCursorZone) {
        setCursor((prev) => ({ ...prev, opacity: 0 }));
        return;
      }

      const el = (e.target as HTMLElement).closest("button, a, [data-cursor]");

      setCursor((prev) => ({ ...prev, dotX: e.clientX, dotY: e.clientY, opacity: 1 }));

      if (el) {
        const rect = (el as HTMLElement).getBoundingClientRect();
        setCursor((prev) => ({
          ...prev,
          rectX: rect.left + rect.width / 2,
          rectY: rect.top + rect.height / 2,
        }));
      } else if (hoveredRef.current) {
        // The hovered element was removed from the DOM (e.g. modal closed),
        // so mouseout never fired — reset immediately
        hoveredRef.current = false;
        setCursor((prev) => ({
          ...prev,
          rectX: e.clientX,
          rectY: e.clientY,
          width: 20,
          height: 20,
          spinning: true,
          hovered: false,
        }));
      } else {
        setCursor((prev) => ({
          ...prev,
          rectX: e.clientX,
          rectY: e.clientY,
        }));
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("[data-no-custom-cursor]")) return;
      const el = (e.target as HTMLElement).closest("button, a, [data-cursor]");
      if (!el) return;

      hoveredRef.current = true;
      const rect = (el as HTMLElement).getBoundingClientRect();
      const expandFrom = (e as MouseEvent).clientX < rect.left + rect.width / 2 ? "left" : "right";

      setCursor((prev) => ({
        ...prev,
        rectX: rect.left + rect.width / 2,
        rectY: rect.top + rect.height / 2,
        width: rect.width + 12,
        height: rect.height + 12,
        spinning: false,
        expandFrom,
        hovered: true,
        opacity: 1,
      }));
    };

    const onMouseOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("[data-no-custom-cursor]")) return;
      const el = (e.target as HTMLElement).closest("button, a, [data-cursor]");
      if (!el) return;

      hoveredRef.current = false;
      setCursor((prev) => ({
        ...prev,
        width: 20,
        height: 20,
        spinning: true,
        hovered: false,
      }));
    };

    const onLeave = () => setCursor((prev) => ({ ...prev, opacity: 0 }));

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  return cursor;
}