// ~/components/ui/terminal-modal.tsx
import { useEffect, useRef } from "react";
import { useTerminal } from "~/context/terminal-context";

const BOOT_LINES = [
  ":: Starting portfolio.service ...",
  ":: Mounting /home/nigel ...",
  ":: Loading environment variables ...",
  "[  OK  ] Reached target Portfolio Ready.",
  "",
];

export default function TerminalModal() {
  const { isTerminalOpen, closeTerminal } = useTerminal();
  const backdropRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeTerminal();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [closeTerminal]);

  // Prevent scroll bleed
  useEffect(() => {
    document.body.style.overflow = isTerminalOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isTerminalOpen]);

  if (!isTerminalOpen) return null;

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={(e) => { if (e.target === backdropRef.current) closeTerminal(); }}
    >
      {/* Window */}
      <div className="w-full max-w-5xl mx-4 rounded-lg overflow-hidden shadow-2xl border border-[#D7D9CE]/10 animate-in slide-in-from-bottom-4 duration-200">

        {/* — KITTY TITLE BAR — */}
        <div className="flex items-center gap-0 bg-black px-4 py-3 border-b border-[#D7D9CE]/8">
          {/* Traffic lights */}
          <div className="flex items-center gap-2 mr-4">
            <button
              onClick={closeTerminal}
              className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-110 transition-all"
              aria-label="Close terminal"
            />
            <span className="w-3 h-3 rounded-full bg-[#febc2e] opacity-50" />
            <span className="w-3 h-3 rounded-full bg-[#28c840] opacity-50" />
          </div>

          {/* Tab */}
          <div className="flex items-center gap-2 bg-[#0a0a0a] px-4 py-1 rounded-t text-[11px] font-mono text-[#D7D9CE]/60 border-t border-x border-[#D7D9CE]/10">
            <span className="text-[#7aa2f7]">~</span>
            <span>nigel@arch</span>
            <span className="text-[#D7D9CE]/20 mx-1">—</span>
            <span className="text-[#D7D9CE]/40">kitty</span>
          </div>

          {/* Spacer + keybind hint */}
          <div className="ml-auto text-[10px] font-mono text-[#D7D9CE]/20 tracking-wider">
            ESC to dismiss
          </div>
        </div>

        {/* — TERMINAL BODY — */}
        <div
          className="bg-black px-6 py-5 font-mono text-sm min-h-150 flex flex-col gap-0.5"
          style={{ fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace" }}
        >
          {/* Boot sequence lines */}
          {BOOT_LINES.map((line, i) => (
            <p key={i} className="text-[#D7D9CE]/35 text-xs leading-5">
              {line || "\u00A0"}
            </p>
          ))}

          {/* Neofetch-style header */}
          <div className="mt-2 mb-4 flex gap-8 items-start">
            {/* ASCII art block */}
            <pre className="text-[#7aa2f7] text-[10px] leading-[1.4] select-none shrink-0">
{`   /\\
  /  \\
 /\\   \\
/  __  \\
\\  \\ \\  \\
 \\ \\_\\_\\  \\
  \\/_/_/  /
     \\_\\__/`}
            </pre>

            {/* System info */}
            <div className="flex flex-col gap-0.5 text-xs pt-1">
              <p>
                <span className="text-[#7aa2f7] font-bold">nigel</span>
                <span className="text-[#D7D9CE]/40">@</span>
                <span className="text-[#7aa2f7] font-bold">arch</span>
              </p>
              <p className="text-[#D7D9CE]/25 text-[10px]">{"─".repeat(16)}</p>
              {[
                ["OS",     "Arch Linux x86_64"],
                ["WM",     "Hyprland"],
                ["Term",   "kitty"],
                ["Shell",  "zsh"],
                ["Editor", "neovim"],
                ["Uptime", "sophomore year"],
              ].map(([key, val]) => (
                <p key={key}>
                  <span className="text-[#7aa2f7]">{key}</span>
                  <span className="text-[#D7D9CE]/30">: </span>
                  <span className="text-[#D7D9CE]/65">{val}</span>
                </p>
              ))}

              {/* Color swatch row */}
              <div className="flex gap-1 mt-2">
                {["#1a1b26","#f7768e","#9ece6a","#e0af68","#7aa2f7","#bb9af7","#7dcfff","#a9b1d6"].map((c) => (
                  <span
                    key={c}
                    className="w-3.5 h-3.5 rounded-sm inline-block"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <p className="text-[#D7D9CE]/10 text-xs mb-3">{"─".repeat(60)}</p>

          {/* IN DEVELOPMENT message */}
          <div className="flex flex-col gap-1">
            <p className="text-xs">
              <span className="text-[#9ece6a]">nigel@arch</span>
              <span className="text-[#D7D9CE]/30">:</span>
              <span className="text-[#7aa2f7]">~</span>
              <span className="text-[#D7D9CE]/30">$ </span>
              <span className="text-[#D7D9CE]/80">portfolio --mode terminal</span>
            </p>
            <p className="text-xs text-[#e0af68]">
              ⚠ terminal interface is currently in development
            </p>
            <p className="text-xs text-[#D7D9CE]/35">
              check back soon. the portfolio CLI is being wired up.
            </p>

            {/* Blinking cursor prompt */}
            <p className="mt-3 text-xs flex items-center gap-0">
              <span className="text-[#9ece6a]">nigel@arch</span>
              <span className="text-[#D7D9CE]/30">:</span>
              <span className="text-[#7aa2f7]">~</span>
              <span className="text-[#D7D9CE]/30">$ </span>
              <span className="inline-block w-1.75 h-3.5 ml-0.5 bg-[#D7D9CE]/70 cursor-blink" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}