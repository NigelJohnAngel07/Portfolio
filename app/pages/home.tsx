import { useState, useEffect } from "react";
import type { Route } from "./+types/home";

import Header from "~/layouts/header";
import folder from "~/assets/folder.svg";
import folderOpen from "~/assets/folder_open.svg";
import arrow from "~/assets/arrow.svg";
import FileExplorer from "~/layouts/fileExplorer";
import ContactModal from "~/components/ContactModal";
import ResumeModal from "~/components/ResumeModal";
import { useTypewriter } from "~/hooks/useTypewriter";
import StarfieldBackground from "~/layouts/background";
import WarpName from "~/components/WarpName";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Nigel | Portfolio" },
    { name: "description", content: "BS Computer Science · UP Mindanao" },
  ];
}

export default function Home() {
  const words: string[] = ["Software", "Student", "Full-stack"];
  const { currentText, isWaiting } = useTypewriter(words, 120, 60, 5000);

  const [isOpen, setIsOpen] = useState(false);
  const [isBrainrot, setIsBrainrot] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [bgReady, setBgReady] = useState(false);
  const [contentReady, setContentReady] = useState(false);

  useEffect(() => {
    // Start bg scale immediately when the page loads
    const bgTimer = setTimeout(() => setBgReady(true), 50);
    // Show content gracefully after the background has mostly expanded
    const contentTimer = setTimeout(() => setContentReady(true), 600);
    return () => {
      clearTimeout(bgTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden animate-in fade-in duration-500">

      <div
        style={{
          position: "fixed",
          inset: 0,
          transform: bgReady ? "scale(1)" : "scale(0.05)",
          borderRadius: bgReady ? "0%" : "50%",
          transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), border-radius 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
          overflow: "hidden",
          zIndex: 0,
        }}
      >
        <StarfieldBackground />
      </div>

      <div
        className="relative z-10 flex flex-col h-full w-full"
        style={{
          opacity: contentReady ? 1 : 0,
          transition: contentReady ? "opacity 0.6s ease" : "none",
        }}
      >
        <Header />
        <main
          className="relative w-full flex-1 overflow-hidden flex flex-col justify-center items-center pb-16"
          onClick={(e) => {
            if (!isOpen) return;
            const target = e.target as HTMLElement;
            // Don't close if clicking inside the file explorer or on a button/link
            if (target.closest("[data-no-custom-cursor]") || target.closest("button, a")) return;
            setIsOpen(false);
          }}
        >
          <div className="flex flex-col w-full max-w-400 px-6 sm:px-12 lg:px-24">
            <h2 className="text-3xl md:text-5xl lg:text-6xl text-left w-full">I am</h2>
            <h1 className="text-[12vw] xl:text-[140px] leading-normal md:leading-tight w-full flex justify-between whitespace-nowrap">
              <WarpName>Nigel</WarpName>
              <WarpName>John</WarpName>
              <WarpName>Angel</WarpName>
            </h1>
            <div className="flex justify-end w-full mt-4 md:mt-8">
              <h2 className="text-xl md:text-2xl lg:text-3xl leading-snug text-right">
                <span
                  className={`overflow-hidden border-r-2 whitespace-nowrap transition-all ${
                    isWaiting ? "cursor-blink" : "border-white"
                  }`}
                >
                  {currentText || "\u00A0"}
                </span>
                &nbsp; Developer
              </h2>
            </div>
          </div>
          <div className="flex flex-col items-center gap-6 mt-12 lg:mt-16 w-full px-6">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 lg:gap-6 w-full sm:w-auto">
              <button
                onClick={() => setIsContactOpen(true)}
                className="px-8 lg:px-12 py-4 rounded-full w-full sm:w-auto bg-foreground text-background text-center text-sm font-medium hover:opacity-80 transition-opacity focus:outline-none"
              >
                Get in Touch
              </button>
              <button
                onClick={() => setIsResumeOpen(true)}
                className="px-8 lg:px-12 py-4 rounded-full w-full sm:w-auto border border-foreground text-foreground text-center text-sm font-medium hover:opacity-70 transition-colors"
              >
                View CV
              </button>
            </div>
            <p className="text-xs sm:text-sm font-sans text-center max-w-lg opacity-80">
              To learn more, check the file explorer at the bottom-left.
            </p>
          </div>
          {isOpen && <FileExplorer />}
          {/* File Explorer trigger — icon + label as one cursor target */}
          <div className="absolute bottom-0 left-0 ml-6 mb-3">
            <button
              data-cursor
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 px-2 py-1 hover:opacity-80 transition-opacity focus:outline-none"
            >
              <img src={isOpen ? folderOpen : folder} />
              <p>File Explorer</p>
            </button>
          </div>
 
          {/* Brainrot Corner — label + arrow as one cursor target, video separate */}
          <div className={`absolute bottom-0 right-0 flex items-end gap-3 ${isBrainrot ? "" : "mr-6"}`}>
            <div className="mb-3">
              <button
                data-cursor
                onClick={() => setIsBrainrot(!isBrainrot)}
                className="flex items-center gap-2 px-2 py-1 hover:opacity-80 transition-opacity focus:outline-none"
              >
                <p>Brainrot Corner</p>
                <img src={arrow} className={`transition-transform duration-300 ${isBrainrot ? "rotate-180" : ""}`} />
              </button>
            </div>
            {isBrainrot && (
              <div className="w-39 h-70 overflow-hidden animate-in slide-in-from-right duration-300">
                <video
                  src="/subwaysurfer.mp4"
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                />
              </div>
            )}
          </div>
          <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
        </main>
      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}