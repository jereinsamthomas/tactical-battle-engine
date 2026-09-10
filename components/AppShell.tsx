"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutGrid,
  Swords,
  Layers,
  BookOpen,
  Scale,
  MessageSquareQuote,
  Gauge,
  Database,
} from "lucide-react";
import { getAllRules, getCustomRules, subscribeMasterStore } from "@/lib/data/masterStore";

const links = [
  { href: "/", label: "Command", icon: LayoutGrid },
  { href: "/battle", label: "Battle Board", icon: Swords },
  { href: "/scenarios", label: "Scenarios (300+)", icon: Layers },
  { href: "/knowledge", label: "Knowledge (1,240+)", icon: BookOpen },
  { href: "/laws", label: "Laws 2026/27", icon: Scale },
  { href: "/debate", label: "Debate Arena", icon: MessageSquareQuote },
  { href: "/analytics", label: "Analytics", icon: Gauge },
  { href: "/datasets", label: "Dataset Studio", icon: Database, isSpecial: true },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [counts, setCounts] = useState({ rules: 1240, custom: 0 });

  useEffect(() => {
    function update() {
      const allR = getAllRules();
      const customR = getCustomRules();
      setCounts({ rules: allR.length, custom: customR.length });
    }
    update();
    return subscribeMasterStore(update);
  }, []);

  return (
    <div className="min-h-screen bg-[#07090d] text-zinc-100 flex flex-col">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#07090d]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-lime-400 text-xs font-black text-black shadow-lg shadow-lime-400/20">
              T
            </span>
            <div>
              <div className="text-sm font-bold tracking-wide text-white">TACTICS OS</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                Battle Engine · Knowledge Matrix · IFAB 2026/27
              </div>
            </div>
          </Link>

          <nav className="flex flex-wrap items-center gap-1">
            {links.map((l) => {
              const active = path === l.href || (l.href !== "/" && path.startsWith(l.href));
              const Icon = l.icon;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition ${
                    active
                      ? "bg-lime-400 text-black font-bold shadow-md shadow-lime-400/20"
                      : l.isSpecial
                      ? "bg-lime-400/10 text-lime-300 border border-lime-400/30 hover:bg-lime-400/20"
                      : "text-zinc-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {l.label}
                  {l.isSpecial && counts.custom > 0 && (
                    <span className="ml-1 rounded-full bg-lime-400 px-1.5 py-0.2 text-[9px] font-mono font-black text-black">
                      +{counts.custom}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl w-full px-4 py-6 flex-1">{children}</main>

      <footer className="border-t border-white/10 bg-black/40 py-4 text-center text-xs text-zinc-500">
        Tactics OS — 1,240 Tactical Rules · 300 Battle Scenarios · 300 Causality Chains · 14 Data Models · IFAB 2026/27
      </footer>
    </div>
  );
}
