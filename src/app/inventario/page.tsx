import { SidebarShell } from "@/components/shell/sidebar-shell";
import { InventoryList } from "@/components/inventory/inventory-list";

export default function InventarioPage() {
  return (
    <SidebarShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Inventario</h2>
          <div className="flex items-center gap-2">
            <button className="rounded-md border px-3 py-2 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900">Ajuste manual</button>
            <button className="rounded-md border px-3 py-2 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900">Importar</button>
          </div>
        </div>
        <InventoryList />
      </div>
    </SidebarShell>
  );
}


