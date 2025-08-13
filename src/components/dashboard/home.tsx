import { TrendingUp, ShoppingCart, Users, CreditCard, AlertTriangle, Calendar, Package, Bot, FileText, Plus } from "lucide-react";
import Link from "next/link";

export function DashboardHome() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Inicio</h2>
        <div className="hidden md:block text-xs text-zinc-500">Actualizado hace 5 min</div>
      </div>
      <QuickActions />
      <KpiRow />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="space-y-6 xl:col-span-2">
          <TodayAgenda />
          <ActivityCard />
        </div>
        <div className="space-y-6">
          <AlertCard />
          <LowStockCard />
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
        <div key={label} className="rounded-xl p-4 border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-950/60">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-600 dark:text-zinc-400">{label}</span>
            <Icon className="size-4 text-zinc-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-lg font-semibold">{value}</span>
            <span className="text-xs text-emerald-700 dark:text-emerald-400">{delta}</span>
          </div>
          <div className="mt-3 h-1.5 rounded-full bg-gradient-to-r from-emerald-400/30 via-sky-400/30 to-violet-400/30" />
        </div>
      ))}
    </div>
  );
}

function AlertCard() {
  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 bg-gradient-to-br from-amber-50/60 to-transparent dark:from-amber-900/10">
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

function QuickActions() {
  const actions = [
    { href: "/catalogo", label: "Nuevo producto", icon: Plus },
    { href: "/inventario", label: "Ajuste inventario", icon: Package },
    { href: "/agenda", label: "Nueva reserva", icon: Calendar },
    { href: "/bots", label: "Configurar bot", icon: Bot },
    { href: "/metricas", label: "Ver métricas", icon: FileText },
  ];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3">
      {actions.map(({ href, label, icon: Icon }) => (
        <Link key={href} href={href} className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-3 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900/40 flex items-center gap-2">
          <Icon className="size-4 text-zinc-500" />
          <span>{label}</span>
        </Link>
      ))}
    </div>
  );
}

function TodayAgenda() {
  const now = new Date();
  const items = [
    { time: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0), title: "Corte + Barba (Juan)" },
    { time: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 30), title: "Color (María)" },
    { time: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 16, 0), title: "Peinado (Luis)" },
  ];
  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Agenda de hoy</h3>
        <Link href="/agenda" className="text-xs text-zinc-500 hover:underline">Ver agenda</Link>
      </div>
      <ul className="mt-3 divide-y divide-zinc-200 dark:divide-zinc-800">
        {items.map((it, idx) => (
          <li key={idx} className="flex items-center justify-between py-2 text-sm">
            <span className="text-zinc-500">{it.time.toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" })}</span>
            <span className="truncate ml-3 flex-1">{it.title}</span>
            <Link href="/agenda" className="text-xs text-zinc-900 dark:text-zinc-100 underline">Detalles</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LowStockCard() {
  const items = [
    { sku: "SKU-1201", name: "Producto 1", stock: 0 },
    { sku: "SKU-1215", name: "Producto 15", stock: 2 },
  ];
  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 bg-gradient-to-br from-zinc-50/60 to-transparent dark:from-zinc-900/30">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Inventario crítico</h3>
        <Link href="/inventario" className="text-xs text-zinc-500 hover:underline">Ver inventario</Link>
      </div>
      <ul className="mt-3 space-y-2 text-sm">
        {items.map((it) => (
          <li key={it.sku} className="flex items-center justify-between">
            <span className="truncate">{it.name} <span className="text-xs text-zinc-500">({it.sku})</span></span>
            <span className={it.stock === 0 ? "text-rose-600" : "text-amber-600"}>{it.stock} uds</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ActivityCard() {
  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 bg-gradient-to-br from-sky-50/60 to-transparent dark:from-sky-900/10">
      <h3 className="text-sm font-medium">Actividad</h3>
      <ul className="mt-3 space-y-2 text-sm">
        <li>Nuevo pedido #1024 por $45.990</li>
        <li>Reserva creada para "Corte + Barba" mañana 10:30</li>
        <li>Stock bajo en SKU BZ-RED-42</li>
      </ul>
    </div>
  );
}


