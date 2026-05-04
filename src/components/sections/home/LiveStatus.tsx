"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Status {
  color: string;
  label: string;
  detail: string;
}

function getStatus(hour: number): Status {
  if (hour >= 0 && hour < 7)
    return { color: "bg-gray-400/60", label: "Sleeping", detail: "zzz" };
  if (hour >= 7 && hour < 9)
    return { color: "bg-yellow-400", label: "Waking up", detail: "Coffee time" };
  if (hour >= 9 && hour < 12)
    return { color: "bg-green-500", label: "Online", detail: "Coding" };
  if (hour >= 12 && hour < 13)
    return { color: "bg-orange-400", label: "Away", detail: "Lunch break" };
  if (hour >= 13 && hour < 18)
    return { color: "bg-green-500", label: "Online", detail: "Deep work" };
  if (hour >= 18 && hour < 21)
    return { color: "bg-blue-400", label: "Online", detail: "Side projects" };
  if (hour >= 21 && hour < 23)
    return { color: "bg-purple-400", label: "Winding down", detail: "Gaming or reading" };
  return { color: "bg-gray-400/60", label: "Sleeping", detail: "zzz" };
}

export function LiveStatus() {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    function update() {
      setStatus(getStatus(new Date().getHours()));
    }
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  if (!status) {
    return (
      <span className="ui-text-meta flex min-h-4 items-center gap-1.5">
        <span className="size-1.5 shrink-0 rounded-full bg-muted-foreground/40" />
        <span>&nbsp;</span>
      </span>
    );
  }

  return (
      <span className="ui-text-meta flex min-h-4 items-center gap-1.5">
      <span className={cn("size-1.5 shrink-0 rounded-full", status.color)} />
      <span>{status.label} &middot; {status.detail}</span>
    </span>
  );
}
