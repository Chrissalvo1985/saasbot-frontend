"use client";

import { SidebarShell } from "@/components/shell/sidebar-shell";
import { Modal } from "@/components/ui/modal";
import { useState } from "react";
import { Upload, FileText, Search, Trash2, Eye, Bot, Plus, BookOpen } from "lucide-react";

type KBItem = {
  id: string;
  title: string;
  type: "pdf" | "doc" | "txt" | "md";
  size: string;
  uploadedAt: string;
  status: "processing" | "ready" | "error";
  botAssigned?: string;
};

const MOCK_KB_ITEMS: KBItem[] = [
  {
    id: "1",
    title: "Manual de Productos.pdf",
    type: "pdf",
    size: "2.4 MB",
    uploadedAt: "2024-01-15",
    status: "ready",
    botAssigned: "Demo Bot 1"
  },
  {
    id: "2", 
    title: "FAQ_Soporte.docx",
    type: "doc",
    size: "1.8 MB",
    uploadedAt: "2024-01-14",
    status: "ready",
    botAssigned: "Demo Bot 2"
  },
  {
    id: "3",
    title: "Políticas_Devolución.txt",
    type: "txt", 
    size: "45 KB",
    uploadedAt: "2024-01-13",
    status: "processing"
  }
];

export default function KBPage() {
  const [openModal, setOpenModal] = useState<"upload" | "preview" | null>(null);
  const [selectedItem, setSelectedItem] = useState<KBItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = MOCK_KB_ITEMS.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SidebarShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Base de Conocimiento</h2>
          <button
            onClick={() => setOpenModal("upload")}
            className="rounded-md bg-zinc-900 text-white px-3 py-2 text-sm hover:opacity-95 flex items-center gap-2"
          >
            <Plus className="size-4" />
            Cargar Archivo
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 bg-gradient-to-br from-emerald-50/60 to-transparent dark:from-emerald-900/10">
            <div className="flex items-center gap-2 text-emerald-600">
              <BookOpen className="size-4" />
              <span className="text-sm font-medium">Total Archivos</span>
            </div>
            <div className="mt-2 text-2xl font-semibold">{MOCK_KB_ITEMS.length}</div>
          </div>
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 bg-gradient-to-br from-sky-50/60 to-transparent dark:from-sky-900/10">
            <div className="flex items-center gap-2 text-sky-600">
              <Bot className="size-4" />
              <span className="text-sm font-medium">Bots Conectados</span>
            </div>
            <div className="mt-2 text-2xl font-semibold">3</div>
          </div>
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 bg-gradient-to-br from-violet-50/60 to-transparent dark:from-violet-900/10">
            <div className="flex items-center gap-2 text-violet-600">
              <FileText className="size-4" />
              <span className="text-sm font-medium">KB Activa</span>
            </div>
            <div className="mt-2 text-2xl font-semibold">2</div>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 bg-gradient-to-r from-zinc-50/70 to-transparent dark:from-zinc-900/20">
            <div className="flex items-center gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar en KB..."
                  className="w-full pl-10 pr-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm"
                />
              </div>
            </div>
          </div>
          
          <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {filteredItems.map((item) => (
              <div key={item.id} className="p-4 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-lg bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center">
                      <FileText className="size-5 text-zinc-600 dark:text-zinc-400" />
                    </div>
                    <div>
                      <div className="font-medium">{item.title}</div>
                      <div className="text-sm text-zinc-500">
                        {item.size} • {item.uploadedAt} • {item.botAssigned || "Sin asignar"}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs ${
                        item.status === "ready"
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300"
                          : item.status === "processing"
                          ? "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300"
                          : "bg-rose-50 text-rose-700 dark:bg-rose-900/20 dark:text-rose-300"
                      }`}
                    >
                      ● {item.status === "ready" ? "Listo" : item.status === "processing" ? "Procesando" : "Error"}
                    </span>
                    <button
                      onClick={() => {
                        setSelectedItem(item);
                        setOpenModal("preview");
                      }}
                      className="p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                      <Eye className="size-4" />
                    </button>
                    <button className="p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-rose-600">
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Modal
          open={openModal === "upload"}
          onClose={() => setOpenModal(null)}
          title="Cargar Archivo KB"
          description="Sube documentos para alimentar la base de conocimiento de tus bots"
          size="lg"
        >
          <div className="space-y-4">
            <div className="rounded-lg border border-dashed border-zinc-300 p-8 text-center dark:border-zinc-700">
              <Upload className="mx-auto size-12 text-zinc-400 mb-4" />
              <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                Arrastra y suelta archivos aquí
              </div>
              <div className="text-xs text-zinc-500 mb-4">o</div>
              <label className="inline-flex cursor-pointer items-center rounded-md border border-zinc-200 bg-white px-4 py-2 text-sm hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900">
                Seleccionar archivos
                <input type="file" accept=".pdf,.doc,.docx,.txt,.md" multiple className="hidden" />
              </label>
              <div className="mt-3 text-xs text-zinc-500">
                PDF, DOC, DOCX, TXT, MD hasta 10MB
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Asignar a Bot</label>
                <select className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900">
                  <option value="">Seleccionar bot</option>
                  <option value="bot1">Demo Bot 1</option>
                  <option value="bot2">Demo Bot 2</option>
                  <option value="bot3">Demo Bot 3</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Categoría</label>
                <select className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900">
                  <option value="">General</option>
                  <option value="productos">Productos</option>
                  <option value="soporte">Soporte</option>
                  <option value="politicas">Políticas</option>
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
                Cargar
              </button>
            </div>
          </div>
        </Modal>

        <Modal
          open={openModal === "preview"}
          onClose={() => setOpenModal(null)}
          title={selectedItem?.title}
          description="Vista previa del contenido"
          size="lg"
        >
          {selectedItem && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-zinc-500">Tipo</div>
                  <div className="font-medium">{selectedItem.type.toUpperCase()}</div>
                </div>
                <div>
                  <div className="text-zinc-500">Tamaño</div>
                  <div className="font-medium">{selectedItem.size}</div>
                </div>
                <div>
                  <div className="text-zinc-500">Subido</div>
                  <div className="font-medium">{selectedItem.uploadedAt}</div>
                </div>
                <div>
                  <div className="text-zinc-500">Bot Asignado</div>
                  <div className="font-medium">{selectedItem.botAssigned || "Sin asignar"}</div>
                </div>
              </div>
              
              <div className="rounded-md border border-zinc-200 p-4 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40">
                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                  Contenido extraído del documento aparecerá aquí...
                </div>
              </div>

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setOpenModal(null)}
                  className="rounded-md bg-zinc-900 px-3 py-2 text-sm text-white hover:opacity-95"
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </SidebarShell>
  );
}
