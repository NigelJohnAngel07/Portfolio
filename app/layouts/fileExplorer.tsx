import { useState } from "react";
import { navigation, type FileItem } from "~/data/fileExplorer/navigation";
import backArrow from "~/assets/back-arrow.svg"

import AboutView from "~/components/views/AboutView";
import ResumeView from "~/components/views/ResumeView";

export default function FileExplorer() {
  // Track which sidebar item is currently active
  const [activeIndex, setActiveIndex] = useState<number>(0);
  
  // Track if a specific file (like a PDF) is opened via double-click
  const [openedFile, setOpenedFile] = useState<FileItem | null>(null);

  // Track which specific file/folder is single-clicked for properties/metadatas
  const [selectedItem, setSelectedItem] = useState<FileItem | null>(null);

  // 1. Get the root Home folder
  const rootHome = navigation[0];
  
  // 2. Filter Home's children to get ONLY folders (About, Tech Stack, Projects, Certification, Photos)
  const homeFoldersOnly = rootHome.children?.filter(item => item.type === "Folder") || [];
  
  // 3. Combine them so "Home" is first, followed by all the sub-folders in the Places sidebar
  const sidebarItems = [rootHome, ...homeFoldersOnly];
  
  // Get the currently selected sidebar item object
  const currentItem = sidebarItems[activeIndex];

  const viewMap: Record<string, React.ReactNode> = {
    ABOUT_VIEW: <AboutView />,
    // RECLAIM_VIEW: <ReClaimView />,
    RESUME_VIEW: <ResumeView />, // Ready to plug in later!
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
    <div className="absolute top-0 inset-x-40 inset-y-20 z-10 border-2 border-border bg-background/99 flex overflow-hidden select-none text-foreground rounded-sm shadow-2xl animate-in slide-in-from-bottom-8 fade-in zoom-in-95 duration-300 ease-out">
      
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
                    setSelectedItem(null);
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
        <div className="flex-1 text-xs font-sans flex flex-col items-center justify-center p-4 bg-background/20 rounded m-2">
          {(() => {
            // Priority: Single-clicked item > Double-clicked open file > Active sidebar folder
            const activeMetadata = selectedItem || openedFile || currentItem;

            if (!activeMetadata) return <p className="text-muted-foreground">No item selected</p>;

            // 1. Determine the image explicitly by file type
            let displayImage = "";

            if (activeMetadata.type === "Folder") {
              displayImage = "/assets/folder.svg";
            } else if (activeMetadata.type === "PDF" || activeMetadata.type === "project") {
              displayImage = "/assets/pdf.svg";
            } else if (activeMetadata.type === "tech") {
              displayImage = activeMetadata.icon;
            } else {
              displayImage = activeMetadata.icon;
            }

            return (
              <div className="flex flex-col items-center justify-center w-full space-y-3">
                {/* Image */}
                <img 
                  src={displayImage} 
                  className="h-20 w-20 object-contain"
                  alt={activeMetadata.name} 
                />

                {/* Name Header */}
                <p className="font-semibold text-center text-sm text-foreground truncate w-full px-2">
                  {activeMetadata.name}
                </p>

                {/* Metadata Fields Wrapper */}
                <div className="w-full space-y-2 pt-3 text-[11px]">
                  
                  {/* Dynamic Type/Category Row */}
                  <div className="flex items-center gap-2">
                    <span className="w-20 text-right text-muted-foreground font-medium">
                      {activeMetadata.type === "tech" ? "Category:" : "Type:"}
                    </span>
                    <span className="flex-1 text-left text-foreground capitalize truncate">
                      {activeMetadata.type === "tech" 
                        ? (activeMetadata.category || "Skill") 
                        : activeMetadata.type}
                    </span>
                  </div>

                  {/* Size Row */}
                  {activeMetadata.size && (
                    <div className="flex items-center gap-2">
                      <span className="w-20 text-right text-muted-foreground font-medium">Size:</span>
                      <span className="flex-1 text-left text-foreground truncate">{activeMetadata.size}</span>
                    </div>
                  )}

                  {/* Date Row */}
                  {activeMetadata.Date && (
                    <div className="flex items-center gap-2">
                      <span className="w-20 text-right text-muted-foreground font-medium">Modified:</span>
                      <span className="flex-1 text-left text-foreground truncate">{activeMetadata.Date}</span>
                    </div>
                  )}

                  {/* Description Block */}
                  {activeMetadata.Description && (
                    <div className="flex gap-2 pt-1">
                      <span className="w-20 text-right text-muted-foreground font-medium shrink-0">Description:</span>
                      <p className="flex-1 text-left text-foreground leading-relaxed line-clamp-3">
                        {activeMetadata.Description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      {/* -- RIGHT SECTION (MAIN CONTENT AREA) -- */}
      <div className="flex-1 h-full flex flex-col overflow-hidden">
        
{/* -- TOP ROW: BACK BUTTON CONTAINER -- */}
<div className="px-6 flex items-center justify-end select-none h-10">
  {/* Only render the button if a file is open OR we are deep in a subfolder */}
  {(openedFile || activeIndex !== 0) && (
    <button
      onClick={() => {
        if (openedFile) {
          setOpenedFile(null);
        } else if (activeIndex !== 0) {
          setActiveIndex(0);
          setSelectedItem(null);
        }
      }}
      className="flex items-center gap-2 px-4 py-0.5 text-xs font-sans rounded transition-all focus:outline-none border border-border/40 bg-[#575757] text-white hover:bg-[#686868] animate-in fade-in duration-150"
      title="Go back"
    >
      <img 
        src={backArrow} 
        className="h-3 w-3 object-contain dark:invert" 
        alt="Back arrow icon" 
      />
      <span>Back</span>
    </button>
  )}
</div>

      {/* -- BOTTOM ROW: PATH BREADCRUMB BAR -- */}
      <div className="flex items-center gap-1.5 px-6 py-1.5 bg-[#161616] border-t border-border/40 text-[11px] font-sans text-muted-foreground select-none">
        <span 
          onClick={() => {
            setActiveIndex(0);
            setOpenedFile(null);
            setSelectedItem(null);
          }} 
          className="hover:text-foreground cursor-pointer transition-colors"
        >
          Home
        </span>
        
        {currentItem && currentItem.name !== "Home" && (
          <>
            <span className="text-muted-foreground/40 text-[8px] mx-0.5">▶</span>
            <span className="text-foreground font-medium">{currentItem.name}</span>
          </>
        )}

        {openedFile && (
          <>
            <span className="text-muted-foreground/40 text-[8px] mx-0.5">▶</span>
            <span className="text-foreground font-semibold">{openedFile.name}</span>
          </>
        )}
      </div>

        {/* -- MAIN SCROLLABLE CONTAINER -- */}
        <div className="flex-1 overflow-y-auto p-6">
          {openedFile ? (
            /* -- FILE VIEWER WORKSPACE -- */
            <div className="flex flex-col h-full w-full animate-in zoom-in-95 duration-150">
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
          ) : currentItem?.type === "Folder" ? (
            /* -- STANDARD FOLDER GRID VIEW -- */
            <>
              {/* Tech Stack Folder Grouping Display View Mode */}
              {currentItem.name === "Tech Stack" && currentItem.children ? (
                <div className="space-y-6">
                  {Object.entries(groupTechStack(currentItem.children)).map(([category, items]) => (
                    <div key={category} className="space-y-2">
                      <h3 className="text-[10px] font-sans font-bold text-muted-foreground uppercase tracking-wider border-b border-border/30 pb-1">
                        {category}
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                        {items.map((tech) => {
                          const isSelected = selectedItem?.name === tech.name;

                          return (
                            <button 
                              key={tech.name} 
                              onClick={() => setSelectedItem(tech)}
                              className={`flex items-center gap-2.5 p-2 rounded border text-left transition-all group focus:outline-none ${
                                isSelected
                                  ? "border-primary bg-muted/60 ring-1 ring-primary/30"
                                  : "border-border/40 bg-muted/20 hover:bg-muted/40"
                              }`}
                            >
                              <img 
                                src={tech.icon} 
                                className="h-5 w-5 object-contain group-hover:scale-105 transition-transform" 
                                alt={tech.name} 
                              />
                              <span className="text-[11px] font-sans font-medium truncate w-full">
                                {tech.name}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Standard Folder View Grid layout (About, Projects, Home contents, etc.) */
                <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6">
                  {currentItem.children?.map((file) => {
                    const isFolder = file.type === "Folder";
                    const isSelected = selectedItem?.name === file.name;

                    return (
                      <button
                        key={file.name}
                        onClick={() => setSelectedItem(file)}
                        onDoubleClick={() => {
                          if (isFolder) {
                            const targetIdx = sidebarItems.findIndex(item => item.name === file.name);
                            if (targetIdx !== -1) {
                              setActiveIndex(targetIdx);
                              setSelectedItem(null);
                            }
                          } else {
                            setOpenedFile(file);
                          }
                        }}
                        className={`flex flex-col items-center gap-2 p-2 rounded group transition-all text-center focus:outline-none border border-transparent ${
                          isSelected ? "bg-muted/60 border-border" : "hover:bg-muted/40"
                        }`}
                      >
                        <div className="relative p-2 rounded group-hover:scale-105 transition-transform">
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

                  {(!currentItem.children || currentItem.children.length === 0) && (
                    <div className="col-span-full py-20 flex flex-col items-center justify-center text-muted-foreground text-xs font-sans">
                      <p>This folder is empty.</p>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            /* -- ROOT FILE VIEW LAYER FAILED FALLBACK -- */
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
    </div>
  );
}