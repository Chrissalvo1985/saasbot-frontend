import { SidebarShell } from "@/components/shell/sidebar-shell";
import { Bot, Play, MessageSquareText, Wrench } from "lucide-react";

export default function BotsPage() {
  return (
    <SidebarShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold flex items-center gap-2"><Bot className="size-5" /> Bots</h2>
          <button className="rounded-md bg-zinc-900 text-white px-3 py-2 text-sm hover:opacity-95">Nuevo Bot</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1,2,3].map((i) => (
            <div key={i} className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-md bg-zinc-900 dark:bg-zinc-100" />
                  <div>
                    <div className="text-sm font-medium">Demo Bot {i}</div>
                    <div className="text-xs text-zinc-500">WhatsApp • Español</div>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300 px-2 py-0.5 text-xs">● Activo</span>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <button className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-200 dark:border-zinc-800 px-3 py-2 text-sm bg-white text-zinc-900 hover:bg-zinc-50 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900">
                  <Play className="size-4" />
                  <span className="hidden sm:inline">Probar</span>
                </button>
                <button className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-200 dark:border-zinc-800 px-3 py-2 text-sm bg-white text-zinc-900 hover:bg-zinc-50 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900">
                  <MessageSquareText className="size-4" />
                  <span className="hidden sm:inline">Logs</span>
                </button>
                <button className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-200 dark:border-zinc-800 px-3 py-2 text-sm bg-white text-zinc-900 hover:bg-zinc-50 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900">
                  <Wrench className="size-4" />
                  <span className="hidden sm:inline">Config</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SidebarShell>
  );
}


