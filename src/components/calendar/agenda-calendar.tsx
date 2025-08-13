"use client";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import { addHours, format, parse, startOfWeek, getDay } from "date-fns";
import { es } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";

export type Event = { title: string; start: Date; end: Date };

const locales = { es } as Record<string, unknown>;
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

const now = new Date();
const defaultEvents: Event[] = [
  { title: "Corte + Barba (Juan)", start: now, end: addHours(now, 1) },
  { title: "Color (María)", start: addHours(now, 2), end: addHours(now, 3) },
];

type AgendaCalendarProps = {
  events?: Event[];
  onSelectEvent?: (event: Event) => void;
};

export function AgendaCalendar({ events, onSelectEvent }: AgendaCalendarProps) {
  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-3 bg-white dark:bg-zinc-950">
      <Calendar
        localizer={localizer}
        events={events ?? defaultEvents}
        defaultView={Views.WEEK}
        views={[Views.DAY, Views.WEEK, Views.MONTH]}
        style={{ height: 600 }}
        onSelectEvent={(e) => onSelectEvent?.(e as Event)}
        messages={{
          next: "Sig.",
          previous: "Ant.",
          today: "Hoy",
          month: "Mes",
          week: "Semana",
          day: "Día",
        }}
      />
    </div>
  );
}


