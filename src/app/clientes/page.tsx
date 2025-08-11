import { SidebarShell } from "@/components/shell/sidebar-shell";
import { Inbox } from "@/components/clients/inbox";

export default function ClientesPage() {
  return (
    <SidebarShell>
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Clientes</h2>
        <Inbox />
      </div>
    </SidebarShell>
  );
}


