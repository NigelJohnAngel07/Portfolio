import reclaimImg from "~/assets/reclaim.jpeg";

const stack = ["React.js", "React Router v7", "Laravel", "Tailwind CSS", "Figma"];

const contributions = [
  {
    role: "Design System",
    detail:
      "Designed a high-fidelity Figma prototype establishing a modern, responsive design system and typography scale optimized for campus users.",
  },
  {
    role: "Frontend Architecture",
    detail:
      "Engineered client-side routing with React Router v7, implementing dynamic role-based views and fluid state management across the app.",
  },
  {
    role: "API Integration",
    detail:
      "Integrated Laravel REST APIs with async data fetching, error boundaries, and state synchronization for real-time item reporting and filtering.",
  },
];

export default function ReclaimView() {
  return (
    <div className="max-w-4xl mx-auto flex flex-col font-sans space-y-10 animate-in fade-in duration-200 pb-12">

      {/* — EYEBROW — */}
      <div className="flex items-center gap-3">
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#D7D9CE]/30">Project</span>
        <span className="h-px flex-1 bg-[#D7D9CE]/10" />
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#D7D9CE]/30">
          Frontend &amp; UI/UX Lead
        </span>
      </div>

      {/* — TITLE BLOCK — */}
      <div className="flex flex-col gap-3">
        <h1 className="font-heading text-5xl sm:text-6xl text-[#D7D9CE] leading-none tracking-tight">
          Re<span className="text-[#D7D9CE]/30">Claim</span>
        </h1>
        <p className="text-sm text-[#D7D9CE]/50 font-sans max-w-lg leading-relaxed">
          A campus lost-and-found platform built to close the gap between lost items and the people
          who need them back.
        </p>
      </div>

      {/* — HERO IMAGE — */}
      <div className="relative w-full overflow-hidden rounded border border-[#D7D9CE]/10 group">
        <img
          src={reclaimImg}
          alt="ReClaim home page screenshot"
          className="w-full object-cover object-top max-h-105 transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
        {/* Bottom fade into background */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-[#040404] to-transparent" />
      </div>

      {/* — STACK PILLS — */}
      <div className="flex flex-wrap gap-2">
        {stack.map((tech) => (
          <span
            key={tech}
            className="text-[10px] tracking-widest uppercase px-3 py-1.5 border border-[#D7D9CE]/15 text-[#D7D9CE]/45 rounded-sm font-sans"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* — DIVIDER — */}
      <div className="flex items-center gap-4">
        <span className="h-px flex-1 bg-[#D7D9CE]/10" />
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#D7D9CE]/25">
          Contributions
        </span>
        <span className="h-px flex-1 bg-[#D7D9CE]/10" />
      </div>

      {/* — CONTRIBUTION ROWS — */}
      <div className="flex flex-col divide-y divide-[#D7D9CE]/8">
        {contributions.map(({ role, detail }) => (
          <div
            key={role}
            className="group grid sm:grid-cols-[180px_1fr] gap-3 sm:gap-8 py-5 hover:bg-[#D7D9CE]/2 transition-colors duration-200 rounded px-1"
          >
            <span className="font-heading text-[10px] tracking-[0.2em] uppercase text-[#D7D9CE]/40 group-hover:text-[#D7D9CE]/70 transition-colors duration-200 pt-0.5">
              {role}
            </span>
            <p className="text-sm text-[#D7D9CE]/55 font-sans leading-relaxed group-hover:text-[#D7D9CE]/75 transition-colors duration-200">
              {detail}
            </p>
          </div>
        ))}
      </div>

      {/* — DIVIDER — */}
      <div className="flex items-center gap-4">
        <span className="h-px flex-1 bg-[#D7D9CE]/10" />
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#D7D9CE]/25">Context</span>
        <span className="h-px flex-1 bg-[#D7D9CE]/10" />
      </div>

      {/* — CONTEXT STAT STRIP — */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { value: "Figma → Code", label: "Design pipeline" },
          { value: "Role-Based", label: "Access model" },
          { value: "REST + SPA", label: "Architecture" },
        ].map(({ value, label }) => (
          <div
            key={label}
            className="border border-[#D7D9CE]/10 rounded p-5 flex flex-col gap-2"
          >
            <span className="font-heading text-sm text-[#D7D9CE]/80">{value}</span>
            <span className="text-[10px] tracking-widest uppercase text-[#D7D9CE]/30 font-sans">
              {label}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}