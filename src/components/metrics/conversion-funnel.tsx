"use client";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LabelList } from "recharts";

const data = [
  { stage: "Contactos", value: 10234 },
  { stage: "Leads", value: 3902 },
  { stage: "Carritos", value: 1850 },
  { stage: "Pedidos", value: 1284 },
  { stage: "Pagados", value: 1002 },
];

export function ConversionFunnel() {
  return (
    <div className="h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ left: 8, right: 8 }}>
          <XAxis type="number" hide />
          <YAxis dataKey="stage" type="category" width={90} tick={{ fontSize: 12 }} />
          <Tooltip formatter={(value) => (Number(value) || 0).toLocaleString()} cursor={{ fill: "rgba(0,0,0,0.04)" }} />
          <Bar dataKey="value" radius={6} fill="#3b82f6">
            <LabelList dataKey="value" position="right" formatter={(value) => (Number(value) || 0).toLocaleString()} className="text-xs fill-current" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}


