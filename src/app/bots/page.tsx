"use client";

import { SidebarShell } from "@/components/shell/sidebar-shell";
import { Bot, Play, MessageSquareText, Wrench } from "lucide-react";
import { useState } from "react";
import { Modal } from "@/components/ui/modal";

export default function BotsPage() {
  const [openModal, setOpenModal] = useState<
    | { type: "new" }
    | { type: "test"; botId: number }
    | { type: "logs"; botId: number }
    | { type: "config"; botId: number }
    | null
  >(null);

  return (
    <SidebarShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold flex items-center gap-2"><Bot className="size-5" /> Bots</h2>
          <button
            className="rounded-md bg-zinc-900 text-white px-3 py-2 text-sm hover:opacity-95"
            onClick={() => setOpenModal({ type: "new" })}
          >
            Nuevo Bot
          </button>
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
                <button
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-200 dark:border-zinc-800 px-3 py-2 text-sm bg-white text-zinc-900 hover:bg-zinc-50 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900"
                  onClick={() => setOpenModal({ type: "test", botId: i })}
                >
                  <Play className="size-4" />
                  <span className="hidden sm:inline">Probar</span>
                </button>
                <button
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-200 dark:border-zinc-800 px-3 py-2 text-sm bg-white text-zinc-900 hover:bg-zinc-50 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900"
                  onClick={() => setOpenModal({ type: "logs", botId: i })}
                >
                  <MessageSquareText className="size-4" />
                  <span className="hidden sm:inline">Logs</span>
                </button>
                <button
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-200 dark:border-zinc-800 px-3 py-2 text-sm bg-white text-zinc-900 hover:bg-zinc-50 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900"
                  onClick={() => setOpenModal({ type: "config", botId: i })}
                >
                  <Wrench className="size-4" />
                  <span className="hidden sm:inline">Config</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <Modal
          open={openModal?.type === "new"}
          onClose={() => setOpenModal(null)}
          title="Crear nuevo bot"
          description="Configura un nuevo asistente para tu canal."
          size="lg"
        >
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nombre</label>
                <input
                  className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none ring-0 focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900"
                  placeholder="Ej. Soporte WhatsApp"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Canal</label>
                <select className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900">
                  <option>WhatsApp</option>
                  <option>Web Chat</option>
                  <option>Instagram</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Idioma</label>
                <select className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900">
                  <option>Español</option>
                  <option>Inglés</option>
                  <option>Portugués</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tono</label>
                <select className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900">
                  <option>Formal</option>
                  <option>Amigable</option>
                  <option>Conciso</option>
                </select>
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
                Crear bot
              </button>
            </div>
          </form>
        </Modal>

        <Modal
          open={openModal?.type === "test"}
          onClose={() => setOpenModal(null)}
          title={`Probar bot ${openModal && "botId" in openModal ? openModal.botId : ""}`}
          description="Simula una conversación breve para validar respuestas."
        >
          <div className="space-y-3">
            <div className="rounded-lg border border-zinc-200 p-3 text-sm dark:border-zinc-800">
              <div className="text-zinc-500">Conversación simulada</div>
              <div className="mt-2 space-y-2">
                <div className="flex gap-2">
                  <div className="rounded-md bg-zinc-100 px-3 py-2 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100">Hola</div>
                </div>
                <div className="flex justify-end gap-2">
                  <div className="rounded-md bg-emerald-600 px-3 py-2 text-white">¡Hola! ¿En qué puedo ayudarte?</div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                className="flex-1 rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900"
                placeholder="Escribe un mensaje"
              />
              <button
                type="button"
                className="rounded-md bg-zinc-900 px-3 py-2 text-sm text-white hover:opacity-95"
                onClick={() => setOpenModal(null)}
              >
                Enviar
              </button>
            </div>
          </div>
        </Modal>

        <Modal
          open={openModal?.type === "logs"}
          onClose={() => setOpenModal(null)}
          title={`Logs del bot ${openModal && "botId" in openModal ? openModal.botId : ""}`}
          description="Últimos eventos y mensajes"
          size="lg"
        >
          <div className="max-h-80 overflow-auto rounded-md border border-zinc-200 p-3 text-xs leading-relaxed dark:border-zinc-800">
            <pre className="whitespace-pre-wrap text-zinc-700 dark:text-zinc-300">{`[12:01:02] INFO  Connected to WhatsApp Gateway
[12:01:05] INFO  Incoming message: "Hola"
[12:01:05] DEBUG Matched intent: greeting
[12:01:05] INFO  Reply: "¡Hola! ¿En qué puedo ayudarte?"
[12:01:14] INFO  Incoming message: "Estado de pedido"
[12:01:14] DEBUG Matched intent: order_status
[12:01:14] WARN  Missing order id, asking for clarification
[12:01:15] INFO  Reply: "¿Puedes indicarme tu número de pedido?"`}</pre>
          </div>
          <div className="mt-4 flex items-center justify-end">
            <button
              type="button"
              onClick={() => setOpenModal(null)}
              className="rounded-md bg-zinc-900 px-3 py-2 text-sm text-white hover:opacity-95"
            >
              Cerrar
            </button>
          </div>
        </Modal>

        <Modal
          open={openModal?.type === "config"}
          onClose={() => setOpenModal(null)}
          title={`Configurar bot ${openModal && "botId" in openModal ? openModal.botId : ""}`}
          description="Ajustes rápidos del asistente"
          size="lg"
        >
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nombre</label>
                <input className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900" defaultValue="Demo Bot" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Estado</label>
                <select className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900">
                  <option>Activo</option>
                  <option>Pausado</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Mensaje de bienvenida</label>
                <textarea className="h-24 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900" defaultValue="¡Hola! ¿En qué puedo ayudarte?" />
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
                Guardar cambios
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </SidebarShell>
  );
}


