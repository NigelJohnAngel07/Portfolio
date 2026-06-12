import {useState} from "react";
import type { Route } from "./+types/home";

import Header from "~/layouts/header";
import folder from "~/assets/folder.svg";
import folderOpen from "~/assets/folder_open.svg";
import arrow from "~/assets/arrow.svg";
import FileExplorer from "~/layouts/fileExplorer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {

  const [isOpen, setIsOpen] = useState(true);  
  const [isBrainrot, setIsBrainrot] = useState(false);

  return(
    <div className="flex flex-col h-screen w-full overflow-hidden">
      <Header />
      <main className="relative w-full flex-1 overflow-hidden">
        <div className="flex flex-col mx-40 mt-30">
          <h2 className="ml-2 text-6xl">I am</h2>
          <h1 className="text-[133.5px] leading-40 flex justify-center">Nigel John Angel</h1>
          <h2 className="text-3xl flex justify-end leading-25">Software Developer</h2>
        </div>
        <div className="flex flex-col items-center gap-6">
          <a href="/resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="px-12 py-6 rounded-full bg-foreground text-background text-center text-sm hover:opacity-80"
          >View CV</a>
          <p className="text-sm font-sans">I use Arch btw</p>
        </div>
        {isOpen && (
          <FileExplorer />
        )}
          <div className=" absolute bottom-0 left-0 ml-10 flex items-center gap-3">
            <button className="hover:opacity-80" onClick={()=>{setIsOpen(!isOpen)}}>
              <img src={isOpen ? folderOpen: folder}></img>
            </button>
            <p> File Explorer </p>
          </div>
          
          <div className={`absolute bottom-0 right-0 flex items-end gap-3 ${isBrainrot ? "" : "mr-10"}`}>
            <div className="flex items-center gap-3">
              <p> Brainrot Corner</p>
              <button className="hover:opacity-80" onClick={()=>{setIsBrainrot(!isBrainrot)}}>
                <img src={arrow} className={isBrainrot ? "rotate-180" : ""}></img>
              </button>
            </div>
            {isBrainrot &&(
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
      </main>
    </div>
  );
} 
