"use client";
import { useMemo, useState } from "react";
import { MessageSquare, Phone, Star, User2 } from "lucide-react";

type Conversation = {
  id: string;
  customer: string;
  phone: string;
  lastMessage: string;
  time: string;
  tags?: string[];
};

const CONVOS: Conversation[] = Array.from({ length: 14 }).map((_, i) => ({
  id: `c-${i}`,
  customer: ["Juan Pérez", "María López", "Carlos Ruiz", "Ana Díaz"][i % 4] + ` ${i}`,
  phone: "+56 9 **** " + (1200 + i),
  lastMessage: i % 3 === 0 ? "¿Tienen talla 42?" : "Quiero reservar para mañana",
  time: i % 2 === 0 ? "10:24" : "Ayer",
  tags: i % 4 === 0 ? ["lead", "alta intención"] : ["soporte"],
}));

export function Inbox() {
  const [selected, setSelected] = useState(CONVOS[0].id);
  const active = useMemo(() => CONVOS.find((c) => c.id === selected)!, [selected]);

  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden grid grid-rows-[auto_1fr]">
      <div className="p-3 flex items-center justify-between">
        <div className="text-sm text-zinc-500">Inbox (Demo)</div>
        <div className="flex items-center gap-2">
          <button className="rounded-md border px-3 py-2 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900">Nuevo</button>
          <button className="rounded-md border px-3 py-2 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900">Asignar</button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr_320px] min-h-[560px]">
        {/* List */}
        <aside className="border-t lg:border-t-0 lg:border-r border-zinc-200 dark:border-zinc-800 divide-y divide-zinc-200 dark:divide-zinc-800">
          {CONVOS.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelected(c.id)}
              className={`w-full text-left px-3 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-900 ${
                c.id === selected ? "bg-zinc-50 dark:bg-zinc-900/40" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="size-9 rounded-full bg-gradient-to-br from-zinc-200 to-zinc-400 dark:from-zinc-700 dark:to-zinc-900" />
                <div className="min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-medium truncate">{c.customer}</div>
                    <div className="text-xs text-zinc-500">{c.time}</div>
                  </div>
                  <div className="text-xs text-zinc-500 truncate">{c.lastMessage}</div>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {c.tags?.map((t) => (
                      <span key={t} className="inline-flex items-center gap-1 rounded-full bg-zinc-100 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 px-2 py-0.5 text-[10px] border border-zinc-200 dark:border-zinc-800">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </aside>
        {/* Chat */}
        <section className="border-t border-zinc-200 dark:border-zinc-800 flex flex-col">
          <div className="p-3 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-3">
            <div className="size-9 rounded-full bg-gradient-to-br from-zinc-200 to-zinc-400 dark:from-zinc-700 dark:to-zinc-900" />
            <div className="min-w-0">
              <div className="font-medium">{active.customer}</div>
              <div className="text-xs text-zinc-500">{active.phone}</div>
            </div>
          </div>
          <div className="flex-1 p-4 space-y-3 overflow-auto">
            <Bubble from="user">Hola, ¿tienen en talla 42?</Bubble>
            <Bubble from="bot">Puedo ayudarte a buscar. ¿Buscas el modelo Breeze?</Bubble>
            <Bubble from="user">Sí, Breeze rojo.</Bubble>
            <ToolCallCard name="consultarStock" args={{ sku: "BRZ-RED-42" }} result={{ stock: 0, status: "sin_stock" }} />
            <Bubble from="bot">Ese color está agotado. Te puedo sugerir alternativas similares. ¿Te las muestro?</Bubble>
          </div>
          <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center gap-2">
            <input className="flex-1 rounded-md border border-zinc-200 dark:border-zinc-800 px-3 py-2 text-sm bg-transparent" placeholder="Escribe un mensaje" />
            <button className="rounded-md bg-zinc-900 text-white px-3 py-2 text-sm">Enviar</button>
          </div>
        </section>
        {/* Profile */}
        <aside className="hidden lg:block border-t lg:border-t-0 lg:border-l border-zinc-200 dark:border-zinc-800 p-4 space-y-4">
          <div>
            <div className="text-sm font-medium">Perfil</div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div className="text-zinc-500">Nombre</div><div>{active.customer}</div>
              <div className="text-zinc-500">Teléfono</div><div>{active.phone}</div>
              <div className="text-zinc-500">Estado</div><div>Lead</div>
            </div>
          </div>
          <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-3">
            <div className="text-sm font-medium mb-2">Notas</div>
            <ul className="text-sm list-disc pl-5 space-y-1 text-zinc-600 dark:text-zinc-300">
              <li>Prefiere retiro en tienda</li>
              <li>Interesado en color rojo</li>
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button className="rounded-md border px-3 py-2 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900 inline-flex items-center gap-2"><Phone className="size-4" /> Llamar</button>
            <button className="rounded-md border px-3 py-2 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900 inline-flex items-center gap-2"><Star className="size-4" /> Marcar</button>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Bubble({ children, from }: { children: React.ReactNode; from: "bot" | "user" }) {
  const isUser = from === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] rounded-2xl px-3 py-2 text-sm border ${
          isUser
            ? "bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:border-zinc-100"
            : "bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function ToolCallCard({ name, args, result }: { name: string; args: Record<string, unknown>; result: Record<string, unknown> }) {
  return (
    <div className="rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 p-3 text-xs text-zinc-600 dark:text-zinc-300">
      <div className="mb-1 inline-flex items-center gap-2 font-medium text-zinc-700 dark:text-zinc-200"><MessageSquare className="size-4" /> Tool: {name}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <pre className="bg-zinc-50 dark:bg-zinc-900 rounded p-2 overflow-auto">{JSON.stringify(args, null, 2)}</pre>
        <pre className="bg-zinc-50 dark:bg-zinc-900 rounded p-2 overflow-auto">{JSON.stringify(result, null, 2)}</pre>
      </div>
    </div>
  );
}


