import { SidebarShell } from "@/components/shell/sidebar-shell";
import { AgendaCalendar } from "@/components/calendar/agenda-calendar";

export default function AgendaPage() {
  return (
    <SidebarShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Agenda</h2>
          <div className="flex items-center gap-2">
            <button className="rounded-md border px-3 py-2 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900">Conectar Google</button>
            <button className="rounded-md bg-zinc-900 text-white px-3 py-2 text-sm hover:opacity-95">Nueva Reserva</button>
          </div>
        </div>
        <AgendaCalendar />
      </div>
    </SidebarShell>
  );
}


