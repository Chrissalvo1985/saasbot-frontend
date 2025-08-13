"use client";

import { SidebarShell } from "@/components/shell/sidebar-shell";
import { AgendaCalendar, Event } from "@/components/calendar/agenda-calendar";
import { useMemo, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { addHours } from "date-fns";

export default function AgendaPage() {
  const [events, setEvents] = useState<Event[]>(() => {
    const now = new Date();
    return [
      { title: "Corte + Barba (Juan)", start: now, end: addHours(now, 1) },
      { title: "Color (María)", start: addHours(now, 2), end: addHours(now, 3) },
    ];
  });
  const [selected, setSelected] = useState<Event | null>(null);
  const [openModal, setOpenModal] = useState<
    | { type: "connect" }
    | { type: "new" }
    | { type: "detail" }
    | { type: "filters" }
    | null
  >(null);
  const [filters, setFilters] = useState<{ query: string; from: string; to: string; onlyUpcoming: boolean }>(
    { query: "", from: "", to: "", onlyUpcoming: false }
  );

  const detail = useMemo(() => selected, [selected]);
  const visibleEvents = useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    const fromDate = filters.from ? new Date(`${filters.from}T00:00:00`) : null;
    const toDate = filters.to ? new Date(`${filters.to}T23:59:59`) : null;
    const now = new Date();
    return events.filter((e) => {
      if (q && !e.title.toLowerCase().includes(q)) return false;
      if (fromDate && e.end < fromDate) return false;
      if (toDate && e.start > toDate) return false;
      if (filters.onlyUpcoming && e.end < now) return false;
      return true;
    });
  }, [events, filters]);

  return (
    <SidebarShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Agenda</h2>
          <div className="flex items-center gap-2">
            <button
              className="rounded-md border px-3 py-2 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900"
              onClick={() => setOpenModal({ type: "connect" })}
            >
              Conectar Google
            </button>
            <button
              className="rounded-md border px-3 py-2 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900"
              onClick={() => setOpenModal({ type: "filters" })}
            >
              Filtros
            </button>
            <button
              className="rounded-md bg-zinc-900 text-white px-3 py-2 text-sm hover:opacity-95"
              onClick={() => setOpenModal({ type: "new" })}
            >
              Nueva Reserva
            </button>
          </div>
        </div>
        <AgendaCalendar
          events={visibleEvents}
          onSelectEvent={(e) => {
            setSelected(e);
            setOpenModal({ type: "detail" });
          }}
        />

        <Modal
          open={openModal?.type === "connect"}
          onClose={() => setOpenModal(null)}
          title="Conectar Google Calendar"
          description="Sincroniza tu agenda para ver y reservar espacios reales"
        >
          <div className="space-y-3 text-sm">
            <p>Se abrirá una ventana para autorizar el acceso a tu Google Calendar.</p>
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpenModal(null)}
                className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => setOpenModal(null)}
                className="rounded-md bg-zinc-900 px-3 py-2 text-sm text-white hover:opacity-95"
              >
                Conectar
              </button>
            </div>
          </div>
        </Modal>

        <Modal
          open={openModal?.type === "filters"}
          onClose={() => setOpenModal(null)}
          title="Filtros del calendario"
          description="Refina los eventos mostrados"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Buscar por título</label>
                <input
                  className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900"
                  placeholder="Ej. Corte, Color, Juan, María"
                  value={filters.query}
                  onChange={(e) => setFilters((f) => ({ ...f, query: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Desde</label>
                <input
                  type="date"
                  className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900"
                  value={filters.from}
                  onChange={(e) => setFilters((f) => ({ ...f, from: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Hasta</label>
                <input
                  type="date"
                  className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900"
                  value={filters.to}
                  onChange={(e) => setFilters((f) => ({ ...f, to: e.target.value }))}
                />
              </div>
            </div>
            <label className="text-sm flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.onlyUpcoming}
                onChange={(e) => setFilters((f) => ({ ...f, onlyUpcoming: e.target.checked }))}
              />
              Solo próximos eventos
            </label>
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setFilters({ query: "", from: "", to: "", onlyUpcoming: false })}
                className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
              >
                Limpiar
              </button>
              <button
                type="button"
                onClick={() => setOpenModal(null)}
                className="rounded-md bg-zinc-900 px-3 py-2 text-sm text-white hover:opacity-95"
              >
                Aplicar
              </button>
            </div>
          </div>
        </Modal>

        <Modal
          open={openModal?.type === "new"}
          onClose={() => setOpenModal(null)}
          title="Nueva reserva"
          description="Crea una cita en tu agenda"
        >
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Título</label>
                <input className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900" placeholder="Servicio + Cliente" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Fecha</label>
                <input type="datetime-local" className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Duración (min)</label>
                <input type="number" className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900" placeholder="60" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Notas</label>
                <input className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900" placeholder="Detalles, preferencias, etc." />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpenModal(null)}
                className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => setOpenModal(null)}
                className="rounded-md bg-zinc-900 px-3 py-2 text-sm text-white hover:opacity-95"
              >
                Crear
              </button>
            </div>
          </form>
        </Modal>

        <Modal
          open={openModal?.type === "detail"}
          onClose={() => setOpenModal(null)}
          title="Detalle de la cita"
          description="Información y acciones rápidas"
        >
          {detail ? (
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-zinc-500">Título</div>
                  <div className="font-medium">{detail.title}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">Inicio</div>
                  <div>{detail.start.toLocaleString("es-CL")}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">Fin</div>
                  <div>{detail.end.toLocaleString("es-CL")}</div>
                </div>
              </div>
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setOpenModal(null)}
                  className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
                >
                  Cerrar
                </button>
                <button
                  type="button"
                  onClick={() => setOpenModal(null)}
                  className="rounded-md bg-zinc-900 px-3 py-2 text-sm text-white hover:opacity-95"
                >
                  Reprogramar
                </button>
                <button
                  type="button"
                  onClick={() => setOpenModal(null)}
                  className="rounded-md bg-rose-600 px-3 py-2 text-sm text-white hover:opacity-95"
                >
                  Cancelar cita
                </button>
              </div>
            </div>
          ) : null}
        </Modal>
      </div>
    </SidebarShell>
  );
}


