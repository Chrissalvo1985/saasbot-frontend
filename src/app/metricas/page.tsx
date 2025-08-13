import { SidebarShell } from "@/components/shell/sidebar-shell";
import { ConversionFunnel } from "@/components/metrics/conversion-funnel";
import { KpiCards } from "@/components/metrics/kpi-cards";

export default function MetricasPage() {
  return (
    <SidebarShell>
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Métricas</h2>
        <KpiCards />
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Embudo (30 días)</h3>
              <div className="text-xs text-zinc-500">Fuente: eventos</div>
            </div>
            <div className="mt-4"><ConversionFunnel /></div>
          </div>
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
            <h3 className="text-sm font-medium">Rendimiento de bots</h3>
            <ul className="mt-4 grid grid-cols-1 gap-3 text-sm">
              <li className="flex items-center justify-between rounded-lg border border-zinc-200 dark:border-zinc-800 p-3">
                <span>CSAT promedio</span>
                <span className="font-medium">4,6/5</span>
              </li>
              <li className="flex items-center justify-between rounded-lg border border-zinc-200 dark:border-zinc-800 p-3">
                <span>Resolución automática</span>
                <span className="font-medium">62%</span>
              </li>
              <li className="flex items-center justify-between rounded-lg border border-zinc-200 dark:border-zinc-800 p-3">
                <span>Tiempo medio primera respuesta</span>
                <span className="font-medium">3,2s</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </SidebarShell>
  );
}


