import { Switch } from "~/components/ui/switch";
import { socials } from "~/data/header";
import terminal from "~/assets/terminal.svg";
import { useTerminal } from "~/context/terminal-context";

export default function Header() {
  const { isTerminalOpen, toggleTerminal } = useTerminal();

  return (
    <header className="relative h-14 px-10 pb-2 flex items-end justify-between">
      <div className="flex gap-40">
        {socials.map((social, index) => (
          <a
            key={index}
            href={social.link}
            target="_blank"
            data-cursor
            className="relative flex items-center gap-2 px-2 py-1"
          >
            <img src={social.icon} className="h-8" />
            <span className="font-sans text-xs">{social.label}</span>
          </a>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <img src={terminal} className="h-8" />
        <Switch
          checked={isTerminalOpen}
          onCheckedChange={toggleTerminal}
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