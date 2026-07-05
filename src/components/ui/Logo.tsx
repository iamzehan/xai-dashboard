import { Cpu } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-3 select-none">
      <span className="text-2xl font-bold tracking-tight">
        <span
          className="
            text-xl font-black tracking-tight
            bg-gradient-to-br
            from-primary
            via-secondary
            to-accent
            bg-clip-text text-transparent
          "
        >
          X
        </span>
        <span className="text-primary">.</span>
        <span className="text-muted-foreground">ai</span>
      </span>
    </div>
  );
}

