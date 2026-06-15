import nigel from "~/assets/linux.svg";

const traits = [
  { label: "Stack Agnostic", desc: "Comfortable jumping between paradigms — React, Next.js, backend services, whatever the problem calls for." },
  { label: "Builder Mentality", desc: "Learning by shipping. Independent projects are where real understanding happens, not just coursework." },
  { label: "Boundary Pusher", desc: "Deliberately breaks things to understand them. If it hasn't failed yet, it hasn't been pushed far enough." },
];

export default function AboutView() {
  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col font-sans space-y-10 animate-in fade-in duration-200 pb-12">

      {/* — HERO STRIP — */}
      <div className="flex flex-col sm:flex-row items-start gap-8 pt-2">

        {/* Photo */}
        <div className="relative shrink-0">
          <div className="w-36 h-36 sm:w-44 sm:h-44 rounded overflow-hidden border border-border">
            <img
              src={nigel}
              alt="Nigel"
              className="w-full h-full object-cover object-top grayscale"
            />
          </div>
          {/* subtle accent line */}
          <span className="absolute -bottom-3 left-0 w-full h-px bg-[#D7D9CE]/20" />
        </div>

        {/* Identity block */}
        <div className="flex flex-col justify-center gap-3">
          <p className="text-xs tracking-[0.25em] text-[#D7D9CE]/40 uppercase">
            BS Computer Science · UP Mindanao
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl leading-tight text-[#D7D9CE]">
            Nigel John Angel
          </h1>
          <p className="text-sm text-[#D7D9CE]/50 leading-relaxed max-w-xs">
            Sophomore · Second Year · Davao, Philippines
          </p>

          {/* tag pills */}
          <div className="flex flex-wrap gap-2 mt-1">
            {["Full-Stack Explorer", "Systems Thinker", "Side-Project Addict"].map((tag) => (
              <span
                key={tag}
                className="text-[10px] tracking-widest uppercase px-3 py-1 border border-[#D7D9CE]/15 text-[#D7D9CE]/50 rounded-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* — DIVIDER — */}
      <div className="flex items-center gap-4">
        <span className="h-px flex-1 bg-[#D7D9CE]/10" />
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#D7D9CE]/25">About</span>
        <span className="h-px flex-1 bg-[#D7D9CE]/10" />
      </div>

      {/* — BIO — */}
      <div className="grid sm:grid-cols-[1fr_1px_1fr] gap-8">
        <p className="text-sm text-[#D7D9CE]/65 leading-[1.9] font-sans">
          I'm a second-year CS student driven by an insatiable curiosity for how complex software
          ecosystems connect. Currently in a high-growth exploration phase well outside standard
          coursework — intentionally diving into multiple tech stacks, experimenting with modern
          frameworks, and bridging fluid frontend layout design with robust backend architecture.
        </p>

        {/* vertical rule */}
        <div className="hidden sm:block w-px bg-[#D7D9CE]/10" />

        <p className="text-sm text-[#D7D9CE]/65 leading-[1.9] font-sans">
          My approach relies on getting hands dirty. I actively build independent projects, push
          boundaries until things break, and dedicate personal time to mastering the tools shaping
          the industry today. The gap between knowing and building is where I spend most of my time.
        </p>
      </div>

      {/* — DIVIDER — */}
      <div className="flex items-center gap-4">
        <span className="h-px flex-1 bg-[#D7D9CE]/10" />
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#D7D9CE]/25">Approach</span>
        <span className="h-px flex-1 bg-[#D7D9CE]/10" />
      </div>

      {/* — TRAIT CARDS — */}
      <div className="grid sm:grid-cols-3 gap-4">
        {traits.map(({ label, desc }) => (
          <div
            key={label}
            className="group border border-[#D7D9CE]/10 rounded p-5 flex flex-col gap-3 hover:border-[#D7D9CE]/25 transition-colors duration-300"
          >
            <span className="font-heading text-xs tracking-widest uppercase text-[#D7D9CE]/80 group-hover:text-[#D7D9CE] transition-colors duration-300">
              {label}
            </span>
            <p className="text-xs text-[#D7D9CE]/40 leading-relaxed font-sans">{desc}</p>
          </div>
        ))}
      </div>

      {/* — CURRENTLY — */}
      <div className="border border-[#D7D9CE]/10 rounded p-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center gap-2 shrink-0">
          {/* live dot */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D7D9CE]/40 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D7D9CE]/60" />
          </span>
          <span className="font-heading text-[10px] tracking-[0.3em] uppercase text-[#D7D9CE]/50">
            Currently
          </span>
        </div>
        <p className="text-xs text-[#D7D9CE]/50 font-sans leading-relaxed sm:border-l sm:border-[#D7D9CE]/10 sm:pl-4">
          Navigating sophomore year at UP Mindanao while building personal projects that explore the
          full stack — from UI systems to backend architecture.
        </p>
      </div>

    </div>
  );
}