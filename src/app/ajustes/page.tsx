import { SidebarShell } from "@/components/shell/sidebar-shell";

export default function AjustesPage() {
  return (
    <SidebarShell>
      <div className="space-y-6 max-w-3xl">
        <h2 className="text-xl font-semibold">Ajustes</h2>
        <section className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
          <h3 className="text-sm font-medium">Integraciones</h3>
          <div className="mt-4 grid sm:grid-cols-2 gap-4">
            <IntegrationCard name="WhatsApp" status="Conectar" />
            <IntegrationCard name="Google Calendar" status="Conectar" />
            <IntegrationCard name="Pago por link" status="Configurar" />
          </div>
        </section>
        <section className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
          <h3 className="text-sm font-medium">Tenants</h3>
          <div className="mt-3 text-sm text-zinc-500">Demo Store (ID: tnt_demo)</div>
        </section>
      </div>
    </SidebarShell>
  );
}

function IntegrationCard({ name, status }: { name: string; status: string }) {
  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-medium">{name}</div>
          <div className="text-xs text-zinc-500">Demo</div>
        </div>
        <button className="rounded-md border px-3 py-2 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900">{status}</button>
      </div>
    </div>
  );
}


