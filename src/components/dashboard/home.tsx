import { TrendingUp, ShoppingCart, Users, CreditCard, AlertTriangle } from "lucide-react";
import { ConversionFunnel } from "@/components/metrics/conversion-funnel";

export function DashboardHome() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Resumen</h2>
      <KpiRow />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Embudo de conversión (7 días)</h3>
              <span className="text-xs text-zinc-500">Demo</span>
            </div>
            <div className="mt-4">
              <ConversionFunnel />
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <AlertCard />
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
            <h3 className="text-sm font-medium">Actividad</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>Nuevo pedido #1024 por $45.990</li>
              <li>Reserva creada para &quot;Corte + Barba&quot; mañana 10:30</li>
              <li>Stock bajo en SKU BZ-RED-42</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function KpiRow() {
  const cards = [
    { label: "Ingresos atribuidos", value: "$1.28M", delta: "+12%", icon: CreditCard },
    { label: "CR Global", value: "3.9%", delta: "+0.4pp", icon: TrendingUp },
    { label: "Pedidos", value: "1,284", delta: "+8%", icon: ShoppingCart },
    { label: "Leads", value: "3,902", delta: "+5%", icon: Users },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map(({ label, value, delta, icon: Icon }) => (
        <div key={label} className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-500">{label}</span>
            <Icon className="size-4 text-zinc-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-lg font-semibold">{value}</span>
            <span className="text-xs text-emerald-600">{delta}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function AlertCard() {
  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
      <div className="flex items-center gap-2 text-amber-600">
        <AlertTriangle className="size-4" />
        <h3 className="text-sm font-medium">Alertas</h3>
      </div>
      <ul className="mt-3 space-y-2 text-sm">
        <li>CR etapa Carrito → Pedido bajo (12%). Revisa prompts de cierre.</li>
        <li>SKU BZ-RED-42 sin stock en 2 sucursales.</li>
      </ul>
    </div>
  );
}


