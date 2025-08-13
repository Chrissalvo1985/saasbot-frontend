"use client";

import { SidebarShell } from "@/components/shell/sidebar-shell";
import { ProductTable } from "@/components/products/product-table";
import { useState } from "react";
import { Modal } from "@/components/ui/modal";

export default function CatalogoPage() {
  const [openModal, setOpenModal] = useState<
    | { type: "import" }
    | { type: "new" }
    | null
  >(null);

  return (
    <SidebarShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Catálogo</h2>
          <div className="flex items-center gap-2">
            <button
              className="rounded-md border px-3 py-2 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900"
              onClick={() => setOpenModal({ type: "import" })}
            >
              Importar CSV
            </button>
            <button
              className="rounded-md bg-zinc-900 text-white px-3 py-2 text-sm hover:opacity-95"
              onClick={() => setOpenModal({ type: "new" })}
            >
              Nuevo Producto
            </button>
          </div>
        </div>
        <ProductTable />

        <Modal
          open={openModal?.type === "import"}
          onClose={() => setOpenModal(null)}
          title="Importar productos (CSV)"
          description="Sube un archivo CSV con tus productos. Soporta delimitador coma o punto y coma."
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
                <label className="block text-sm font-medium mb-1">Codificación</label>
                <select className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900">
                  <option>UTF-8</option>
                  <option>ISO-8859-1</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tiene encabezados</label>
                <select className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900">
                  <option>Sí</option>
                  <option>No</option>
                </select>
              </div>
            </div>

            <div className="rounded-md bg-zinc-50 p-3 text-xs dark:bg-zinc-900/40">
              Descarga plantilla: <a className="text-zinc-900 underline dark:text-zinc-100" href="#">CSV ejemplo</a>
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

        <Modal
          open={openModal?.type === "new"}
          onClose={() => setOpenModal(null)}
          title="Nuevo producto"
          description="Completa los datos básicos para crear un producto."
          size="lg"
        >
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nombre</label>
                <input className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900" placeholder="Ej. Zapatillas Runner" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">SKU</label>
                <input className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900" placeholder="SKU-001" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Precio</label>
                <input type="number" className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900" placeholder="0.00" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Stock</label>
                <input type="number" className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900" placeholder="0" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Categoría</label>
                <select className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900">
                  <option>General</option>
                  <option>Calzado</option>
                  <option>Accesorios</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Estado</label>
                <select className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900">
                  <option>Activo</option>
                  <option>Borrador</option>
                  <option>Agotado</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Descripción</label>
                <textarea className="h-24 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900" placeholder="Detalles del producto" />
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
                Crear producto
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </SidebarShell>
  );
}


