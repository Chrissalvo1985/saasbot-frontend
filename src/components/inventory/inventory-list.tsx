"use client";
import { useMemo, useState } from "react";
import { PackageCheck, PackageX } from "lucide-react";

type Row = { sku: string; name: string; onHand: number; reserved: number };

const rows: Row[] = Array.from({ length: 20 }).map((_, i) => ({
  sku: `SKU-${1200 + i}`,
  name: `Producto ${i}`,
  onHand: i % 7 === 0 ? 0 : 10 + (i % 5),
  reserved: i % 3,
}));

export function InventoryList() {
  const [onlyLow, setOnlyLow] = useState(false);
  const data = useMemo(
    () => rows.filter((r) => (onlyLow ? r.onHand <= 3 : true)),
    [onlyLow]
  );

  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      <div className="p-3 flex items-center justify-between">
        <div className="text-sm text-zinc-500">Reservas temporales de 15 min</div>
        <label className="text-sm flex items-center gap-2">
          <input type="checkbox" checked={onlyLow} onChange={(e) => setOnlyLow(e.target.checked)} />
          Solo bajo stock
        </label>
      </div>
      <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
        {data.map((r) => (
          <div key={r.sku} className="grid grid-cols-2 md:grid-cols-5 gap-2 px-3 py-2 text-sm items-center">
            <div className="font-mono text-xs">{r.sku}</div>
            <div className="truncate">{r.name}</div>
            <div className="hidden md:block">En mano: {r.onHand}</div>
            <div className="hidden md:block">Reservado: {r.reserved}</div>
            <div className="justify-self-end">
              {r.onHand > 0 ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300 px-2 py-0.5 text-xs">
                  <PackageCheck className="size-3" /> en_stock
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 text-rose-700 dark:bg-rose-900/20 dark:text-rose-300 px-2 py-0.5 text-xs">
                  <PackageX className="size-3" /> sin_stock
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


