"use client";

import { SidebarShell } from "@/components/shell/sidebar-shell";
import { InventoryList } from "@/components/inventory/inventory-list";
import { useState } from "react";
import { Modal } from "@/components/ui/modal";

export default function InventarioPage() {
  const [openModal, setOpenModal] = useState<
    | { type: "adjust" }
    | { type: "import" }
    | null
  >(null);

  return (
    <SidebarShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Inventario</h2>
          <div className="flex items-center gap-2">
            <button
              className="rounded-md border px-3 py-2 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900"
              onClick={() => setOpenModal({ type: "adjust" })}
            >
              Ajuste manual
            </button>
            <button
              className="rounded-md border px-3 py-2 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900"
              onClick={() => setOpenModal({ type: "import" })}
            >
              Importar
            </button>
          </div>
        </div>
        <InventoryList />

        <Modal
          open={openModal?.type === "adjust"}
          onClose={() => setOpenModal(null)}
          title="Ajuste manual de stock"
          description="Modifica el stock de un SKU con motivo y tipo de ajuste"
        >
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">SKU</label>
                <input
                  className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900"
                  placeholder="Ej. SKU-1234"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tipo</label>
                <select className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900">
                  <option value="increase">Incremento (+)</option>
                  <option value="decrease">Decremento (-)</option>
                  <option value="set">Fijar cantidad</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Cantidad</label>
                <input type="number" className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900" placeholder="0" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Motivo</label>
                <input className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900" placeholder="Ej. rectificación, merma, inventario físico, etc." />
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
                Guardar ajuste
              </button>
            </div>
          </form>
        </Modal>

        <Modal
          open={openModal?.type === "import"}
          onClose={() => setOpenModal(null)}
          title="Importar inventario (CSV)"
          description="Actualiza stock en masa mediante archivo CSV"
          size="lg"
        >
          <div className="space-y-4">
            <div className="rounded-lg border border-dashed border-zinc-300 p-6 text-center dark:border-zinc-700">
              <div className="text-sm text-zinc-600 dark:text-zinc-400">Arrastra y suelta tu archivo aquí</div>
              <div className="mt-2 text-xs text-zinc-500">o</div>
              <div className="mt-2">
                <label className="inline-flex cursor-pointer items-center rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900">
                  Seleccionar archivo
                  <input type="file" accept=".csv" className="hidden" />
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Separador</label>
                <select className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900">
                  <option value=",">Coma (,)</option>
                  <option value=";">Punto y coma (;)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Campo SKU</label>
                <input className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900" placeholder="Columna SKU" defaultValue="sku" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Campo cantidad</label>
                <input className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900" placeholder="Columna cantidad" defaultValue="onHand" />
              </div>
            </div>

            <div className="rounded-md bg-zinc-50 p-3 text-xs dark:bg-zinc-900/40">
              Plantilla: <a className="text-zinc-900 underline dark:text-zinc-100" href="#">CSV ejemplo</a>
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
                Importar
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </SidebarShell>
  );
}


