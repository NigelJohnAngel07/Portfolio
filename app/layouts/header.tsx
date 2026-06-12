import { Switch } from "~/components/ui/switch";

import { socials } from "~/data/header";
import terminal from "~/assets/terminal.svg";

export default function Header() {
  return(
    <header className="relative h-14 px-10 pb-2  flex items-end justify-between">
      <div className="flex gap-40">
        {socials.map((social, index)=> {
          return(
            <div className="relative flex items-center gap-2">
              <img src={social.icon} className="h-8"></img>
              <a href={social.link} target="_blank" className="font-sans text-xs">{social.label}</a>
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-4">
        <img src={terminal} className="h-8"></img>
        <Switch 
          className="
            data-[size=default]:h-6 
            data-[size=default]:w-12 
            **:data-[slot=switch-thumb]:size-5
            **:data-[slot=switch-thumb]:data-checked:translate-x-6
          " 
        />
      </div>
    </header>
  );
} 