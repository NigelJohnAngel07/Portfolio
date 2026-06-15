import React from "react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-full h-full max-w-5xl flex flex-col overflow-hidden rounded-2xl bg-background/80 backdrop-blur-2xl border border-white/10 shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/20 shrink-0">
          <h2 className="text-xl font-bold tracking-wide">Resume / CV</h2>
          <div className="flex items-center gap-6">
            <a 
              href="/resume.pdf" 
              download
              className="text-sm font-semibold opacity-70 hover:opacity-100 transition-opacity"
            >
              Download PDF
            </a>
            <button 
              onClick={onClose}
              className="text-foreground/50 hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 w-full overflow-y-auto p-2 sm:p-4 bg-white/5">
          <iframe 
            src="/resume.pdf" 
            className="w-full h-full min-h-200 rounded-xl border border-white/10 bg-white"
            title="Resume PDF Viewer"
          />
        </div>
      </div>
    </div>
  );
}
