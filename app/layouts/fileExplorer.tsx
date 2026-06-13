import { useState } from "react";
import { navigation, type FileItem } from "~/data/fileExplorer/navigation";

import AboutView from "~/components/views/AboutView";

export default function FileExplorer() {
  // Track which sidebar item is currently active
  const [activeIndex, setActiveIndex] = useState<number>(0);
  
  // Track if a specific file (like a PDF) is opened via double-click
  const [openedFile, setOpenedFile] = useState<FileItem | null>(null);

  // 1. Get the root Home folder
  const rootHome = navigation[0];
  
  // 2. Filter Home's children to get ONLY folders (About, Tech Stack, Projects, Certification, Photos)
  const homeFoldersOnly = rootHome.children?.filter(item => item.type === "folder") || [];
  
  // 3. Combine them so "Home" is first, followed by all the sub-folders in the Places sidebar
  const sidebarItems = [rootHome, ...homeFoldersOnly];
  
  // Get the currently selected sidebar item object
  const currentItem = sidebarItems[activeIndex];

  const viewMap: Record<string, React.ReactNode> = {
    ABOUT_VIEW: <AboutView />,
    // RECLAIM_VIEW: <ReClaimView />,
    // RESUME_VIEW: <ResumeView />, // Ready to plug in later!
  };

  // Helper function to dynamically group the Tech Stack items by their category field
  const groupTechStack = (items: FileItem[]) => {
    return items.reduce((groups: Record<string, FileItem[]>, item) => {
      const category = item.category || "Other";
      if (!groups[category]) groups[category] = [];
      groups[category].push(item);
      return groups;
    }, {});
  };

  return (
    <div className="absolute top-0 inset-x-40 inset-y-20 z-10 border-2 border-border bg-background/99 flex overflow-hidden select-none text-foreground rounded-sm shadow-2xl">
      
      {/* -- LEFT SECTION (SIDEBAR) -- */}
      <div className="w-[30vh] h-full py-4 border-r-2 border-border flex flex-col justify-between bg-background/50">
        
        {/* -- NAVIGATION SECTION -- */}
        <div className="mx-2">
          <p className="font-sans text-[11px] uppercase tracking-wider text-muted-foreground font-semibold px-2 mb-2">Places</p>
          <div className="space-y-0.5">
            {sidebarItems.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    setActiveIndex(index);
                    setOpenedFile(null); // Close any open file view when switching main sections
                  }}
                  className={`flex w-full items-center gap-3 p-2 px-3 rounded transition-colors text-left ${
                    isActive
                      ? "bg-[#575757] text-white" // Active state
                      : "hover:bg-[#575757]/30 text-foreground" // Hover state
                  }`}
                >
                  <img src={item.icon} className="h-4 w-4 object-contain" alt={item.name} />
                  <p className="text-xs font-sans font-medium">{item.name}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* -- METADATA SECTION -- */}
        <div className="mx-4 mb-2 p-3 border border-border/60 bg-muted/30 rounded text-xs font-sans space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border/40 pb-1">Properties</p>
          
          <div>
            <p className="text-muted-foreground font-semibold">Name:</p>
            <p className="font-medium text-foreground">{openedFile ? openedFile.name : currentItem?.name}</p>
          </div>

          <div>
            <p className="text-muted-foreground font-semibold">Size:</p>
            <p className="font-medium text-foreground">{openedFile ? openedFile.size : currentItem?.size}</p>
          </div>
          
          {(openedFile?.Date || currentItem?.Date) && (
            <div>
              <p className="text-muted-foreground font-semibold">Date Created:</p>
              <p className="font-medium text-foreground">{openedFile ? openedFile.Date : currentItem?.Date}</p>
            </div>
          )}

          {(openedFile?.Description || currentItem?.Description) && (
            <div>
              <p className="text-muted-foreground font-semibold">Description:</p>
              <p className="font-medium text-foreground text-pretty">
                {openedFile ? openedFile.Description : currentItem?.Description}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* -- RIGHT SECTION (MAIN CONTENT AREA) -- */}
      <div className="flex-1 h-full flex flex-col overflow-y-auto p-6">
        
        {openedFile ? (
          /* -- FILE VIEWER WORKSPACE -- */
          <div className="flex flex-col h-full w-full animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-border">
              <button 
                onClick={() => setOpenedFile(null)}
                className="text-xs font-sans px-3 py-1 bg-[#575757] text-white rounded hover:opacity-95 transition-opacity"
              >
                ← Back to Files
              </button>
              <span className="text-xs font-sans font-semibold text-muted-foreground">{openedFile.name}</span>
            </div>
            
            {/* FIXED VIEW REPLACEMENT ROUTER */}
            <div className="flex-1 w-full overflow-y-auto rounded">
              {openedFile.content && viewMap[openedFile.content] ? (
                viewMap[openedFile.content]
              ) : (
                <div className="flex-1 h-full w-full bg-muted/20 rounded flex flex-col items-center justify-center border border-border border-dashed p-8">
                  <p className="text-sm font-sans text-muted-foreground mb-1">
                    Displaying Target Component Layout View for:
                  </p>
                  <p className="font-mono text-xs font-bold bg-muted px-2 py-1 rounded border border-border">
                    {openedFile.content}
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : currentItem?.type === "folder" ? (
          /* -- STANDARD FOLDER GRID VIEW -- */
          <>
            <div className="mb-4 border-b border-border/60 pb-2">
              <h1 className="text-xl font-sans font-bold">{currentItem?.name}</h1>
            </div>

            {/* Tech Stack Folder Grouping Display View Mode */}
            {currentItem.name === "Tech Stack" && currentItem.children ? (
              <div className="space-y-6">
                {Object.entries(groupTechStack(currentItem.children)).map(([category, items]) => (
                  <div key={category} className="space-y-2">
                    <h3 className="text-[10px] font-sans font-bold text-muted-foreground uppercase tracking-wider border-b border-border/30 pb-1">
                      {category}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                      {items.map((tech) => (
                        <div 
                          key={tech.name} 
                          className="flex items-center gap-2.5 p-2 rounded border border-border/40 bg-muted/20 hover:bg-muted/40 transition-colors"
                        >
                          <img src={tech.icon} className="h-5 w-5 object-contain" alt={tech.name} />
                          <span className="text-[11px] font-sans font-medium truncate">{tech.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Standard Folder View Grid layout (About, Projects, Home contents, etc.) */
              <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6">
                {currentItem.children?.map((file) => {
                  const isFolder = file.type === "folder";

                  return (
                    <button
                      key={file.name}
                      onClick={() => {
                        // Double-click is for launching views, single-click highlights properties
                      }}
                      onDoubleClick={() => {
                        if (isFolder) {
                          // Find index of this folder inside our sidebar array to navigate into it
                          const targetIdx = sidebarItems.findIndex(item => item.name === file.name);
                          if (targetIdx !== -1) setActiveIndex(targetIdx);
                        } else if (file.content) {
                          setOpenedFile(file);
                        }
                      }}
                      className="flex flex-col items-center gap-2 p-2 rounded hover:bg-muted/40 group transition-all text-center focus:outline-none focus:bg-muted/60"
                    >
                      <div className="relative p-2 rounded group-hover:scale-105 transition-transform">
                        {/* Rule: If it's a folder type item, explicitly point its src to "/assets/folder" */}
                        <img 
                          src={isFolder ? "/assets/folder.svg" : file.icon} 
                          className="h-10 w-10 object-contain" 
                          alt={file.name} 
                        />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-xs font-sans font-medium line-clamp-2 max-w-23.75">{file.name}</p>
                        <p className="text-[10px] font-sans text-muted-foreground">{file.size}</p>
                      </div>
                    </button>
                  );
                })}

                {/* Empty State Fallback */}
                {(!currentItem.children || currentItem.children.length === 0) && (
                  <div className="col-span-full py-20 flex flex-col items-center justify-center text-muted-foreground text-xs font-sans">
                    <p>This folder is empty.</p>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          /* -- ROOT FILE VIEW LAYER -- */
          <div className="flex flex-col h-full w-full animate-in zoom-in-95 duration-150">
            <div className="mb-4 border-b border-border/60 pb-2">
              <h1 className="text-xl font-sans font-bold">{currentItem?.name}</h1>
            </div>
            <div className="flex-1 w-full bg-muted/20 rounded flex flex-col items-center justify-center border border-border border-dashed p-8">
              <p className="text-sm font-sans text-muted-foreground mb-1">
                Root level file opened directly from layout navigation sidebar token target:
              </p>
              <p className="font-mono text-xs font-bold bg-muted px-2 py-1 rounded border border-border">
                {currentItem?.content}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}