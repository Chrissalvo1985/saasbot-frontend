import { SidebarShell } from "@/components/shell/sidebar-shell";
import { ConversionFunnel } from "@/components/metrics/conversion-funnel";

export default function MetricasPage() {
  return (
    <SidebarShell>
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Métricas</h2>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Embudo (30 días)</h3>
              <div className="text-xs text-zinc-500">Fuente: eventos</div>
            </div>
            <div className="mt-4"><ConversionFunnel /></div>
          </div>
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
            <h3 className="text-sm font-medium">Heatmap horario</h3>
            <div className="mt-4 text-sm text-zinc-500">Placeholder</div>
          </div>
        </div>
      </div>
    </SidebarShell>
  );
}


