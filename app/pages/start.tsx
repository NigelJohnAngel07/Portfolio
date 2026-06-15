import { useState } from "react";
import type { Route } from "./+types/home";
import { useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Start() {
  const navigate = useNavigate();
  const [zooming, setZooming] = useState(false);

  const handleEnter = () => {
    setZooming(true);
    setTimeout(() => navigate("/home"), 800);
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden bg-background animate-in fade-in duration-1000">
      <div
        className="flex flex-col items-center gap-10"
        style={{
          transform: zooming ? "scale(80)" : "scale(1)",
          opacity: zooming ? 0 : 1,
          transition: zooming
            ? "transform 0.8s cubic-bezier(0.5, 0, 0.8, 1), opacity 0.3s ease 0.5s"
            : "none",
          pointerEvents: zooming ? "none" : "auto",
        }}
      >
        <h1 className="text-6xl whitespace-nowrap">Dive into the digital matrix</h1>
        <button
          onClick={handleEnter}
          className="btn-shine px-12 py-6 rounded-full bg-[#161616] text-foreground border text-center text-md hover:opacity-80 transition-opacity"
        >
          Enter
        </button>
      </div>
    </section>
  );
}