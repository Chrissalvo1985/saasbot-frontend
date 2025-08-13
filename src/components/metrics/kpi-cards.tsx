"use client";

import { ResponsiveContainer, AreaChart, Area } from "recharts";

type Kpi = {
  title: string;
  value: string;
  delta: string;
  trend: number[];
  positive?: boolean;
};

const KPIS: Kpi[] = [
  { title: "Ingresos (30d)", value: "$42.530.000", delta: "+12%", trend: [28, 32, 31, 35, 36, 38, 42, 43], positive: true },
  { title: "Conversión", value: "9,8%", delta: "+0,6pp", trend: [7.9, 8.4, 8.2, 8.9, 9.1, 9.4, 9.6, 9.8], positive: true },
  { title: "Ticket promedio", value: "$42.300", delta: "+4%", trend: [38, 39, 40, 40, 41, 42, 42, 43], positive: true },
  { title: "Tiempo resp. medio", value: "12s", delta: "-18%", trend: [19, 18, 17, 16, 15, 14, 13, 12], positive: true },
];

export function KpiCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {KPIS.map((kpi) => (
        <div key={kpi.title} className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
          <div className="text-xs text-zinc-500">{kpi.title}</div>
          <div className="mt-1 flex items-baseline justify-between">
            <div className="text-xl font-semibold">{kpi.value}</div>
            <span className={`text-xs ${kpi.positive ? "text-emerald-600" : "text-rose-600"}`}>{kpi.delta}</span>
          </div>
          <div className="mt-2 h-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={kpi.trend.map((v, i) => ({ x: i, y: v }))} margin={{ left: 0, right: 0, top: 6, bottom: 0 }}>
                <Area type="monotone" dataKey="y" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.15} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      ))}
    </div>
  );
}


