export default function ResumeView() {
  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col font-sans space-y-4 animate-in fade-in duration-200">
      

      {/* -- EMBEDDED PDF VIEWER WORKSPACE -- */}
      <div className="flex-1 w-full min-h-[60vh] rounded border border-border bg-background overflow-hidden shadow-sm">
        <iframe
          src="/resume.pdf#toolbar=1&navpanes=0"
          className="w-full h-full border-none"
          title="Resume PDF Viewer"
        />
      </div>
      
    </div>
  );
}