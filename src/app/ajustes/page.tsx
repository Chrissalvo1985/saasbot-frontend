"use client";

import { SidebarShell } from "@/components/shell/sidebar-shell";
import { Modal } from "@/components/ui/modal";
import { useState } from "react";

export default function AjustesPage() {
  const [openModal, setOpenModal] = useState<
    | { type: "whatsapp" }
    | { type: "gcal" }
    | { type: "pay" }
    | null
  >(null);

  return (
    <SidebarShell>
      <div className="space-y-6 max-w-3xl">
        <h2 className="text-xl font-semibold">Ajustes</h2>
        <section className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
          <h3 className="text-sm font-medium">Integraciones</h3>
          <div className="mt-4 grid sm:grid-cols-2 gap-4">
            <IntegrationCard name="WhatsApp" status="Conectar" onClick={() => setOpenModal({ type: "whatsapp" })} />
            <IntegrationCard name="Google Calendar" status="Conectar" onClick={() => setOpenModal({ type: "gcal" })} />
            <IntegrationCard name="Pago por link" status="Configurar" onClick={() => setOpenModal({ type: "pay" })} />
          </div>
        </section>
        

        <Modal
          open={openModal?.type === "whatsapp"}
          onClose={() => setOpenModal(null)}
          title="Conectar WhatsApp"
          description="Elige el método de conexión y proporciona las credenciales necesarias"
          size="lg"
        >
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Método</label>
                <select className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900">
                  <option>Oficial (Cloud API)</option>
                  <option>No oficial (Web)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Token / API Key</label>
                <input className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900" placeholder="Bearer ..." />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Número o ID de teléfono</label>
                <input className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900" placeholder="+56 9 ... / phone_number_id" />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2">
              <button type="button" onClick={() => setOpenModal(null)} className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900">Cancelar</button>
              <button type="button" onClick={() => setOpenModal(null)} className="rounded-md bg-zinc-900 px-3 py-2 text-sm text-white hover:opacity-95">Conectar</button>
            </div>
          </form>
        </Modal>

        <Modal
          open={openModal?.type === "gcal"}
          onClose={() => setOpenModal(null)}
          title="Conectar Google Calendar"
          description="Sincroniza tu agenda para disponibilidad y reservas"
        >
          <div className="space-y-4">
            <div className="rounded-md border border-zinc-200 p-3 text-sm dark:border-zinc-800">Se abrirá una ventana para autorizar el acceso con tu cuenta de Google.</div>
            <div className="flex items-center justify-end gap-2">
              <button type="button" onClick={() => setOpenModal(null)} className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900">Cancelar</button>
              <button type="button" onClick={() => setOpenModal(null)} className="rounded-md bg-zinc-900 px-3 py-2 text-sm text-white hover:opacity-95">Conectar</button>
            </div>
          </div>
        </Modal>

        <Modal
          open={openModal?.type === "pay"}
          onClose={() => setOpenModal(null)}
          title="Configurar pago por link"
          description="Selecciona proveedor y credenciales para cobros"
        >
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Proveedor</label>
                <select className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900">
                  <option>MercadoPago</option>
                  <option>Stripe</option>
                  <option>Flow</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Clave pública</label>
                <input className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900" placeholder="pk_live_..." />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Clave secreta</label>
                <input className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900" placeholder="sk_live_..." />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2">
              <button type="button" onClick={() => setOpenModal(null)} className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900">Cancelar</button>
              <button type="button" onClick={() => setOpenModal(null)} className="rounded-md bg-zinc-900 px-3 py-2 text-sm text-white hover:opacity-95">Guardar</button>
            </div>
          </form>
        </Modal>

      </div>
    </SidebarShell>
  );
}

function IntegrationCard({ name, status, onClick }: { name: string; status: string; onClick?: () => void }) {
  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-medium">{name}</div>
          <div className="text-xs text-zinc-500">Demo</div>
        </div>
        <button onClick={onClick} className="rounded-md border px-3 py-2 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900">{status}</button>
      </div>
    </div>
  );
}
 


