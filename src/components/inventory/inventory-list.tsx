"use client";
import { useEffect, useMemo, useState } from "react";
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
  const [pageSize, setPageSize] = useState<10 | 50 | 100>(10);
  const [pageIndex, setPageIndex] = useState(0);
  const data = useMemo(() => rows.filter((r) => (onlyLow ? r.onHand <= 3 : true)), [onlyLow]);
  const totalRows = data.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / pageSize));
  const clampedPageIndex = Math.min(pageIndex, totalPages - 1);
  const pageStart = clampedPageIndex * pageSize;
  const pageEnd = Math.min(pageStart + pageSize, totalRows);
  const pageRows = useMemo(() => data.slice(pageStart, pageEnd), [data, pageStart, pageEnd]);

  useEffect(() => {
    setPageIndex(0);
  }, [onlyLow, pageSize]);

  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      <div className="p-3 flex items-center justify-between">
        <div className="text-sm text-zinc-500">Reservas temporales de 15 min</div>
        <label className="text-sm flex items-center gap-2">
          <input type="checkbox" checked={onlyLow} onChange={(e) => setOnlyLow(e.target.checked)} />
          Solo bajo stock
        </label>
      </div>
      
      {/* Table Headers */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 px-3 py-3 text-xs font-medium text-zinc-500 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/20">
        <div>SKU</div>
        <div>Producto</div>
        <div className="hidden md:block">En Mano</div>
        <div className="hidden md:block">Reservado</div>
        <div className="justify-self-end">Estado</div>
      </div>
      
      <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
        {pageRows.map((r) => (
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
      <div className="border-t border-zinc-200 dark:border-zinc-800 p-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs text-zinc-500">
        <div className="flex items-center gap-2">
          <span>
            {totalRows === 0 ? "0" : `${pageStart + 1}–${pageEnd}`} de {totalRows} filas
          </span>
          <div className="flex items-center gap-2">
            <span>Mostrar</span>
            <select
              className="rounded-md border border-zinc-200 bg-transparent px-2 py-1 dark:border-zinc-800"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value) as 10 | 50 | 100)}
            >
              <option value={10}>10</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            className="rounded-md border px-2 py-1 disabled:opacity-50"
            aria-label="Anterior"
            onClick={() => setPageIndex((i) => Math.max(0, i - 1))}
            disabled={clampedPageIndex === 0 || totalRows === 0}
          >
            ‹
          </button>
          <span className="px-2">{totalRows === 0 ? 0 : clampedPageIndex + 1}/{totalPages}</span>
          <button
            className="rounded-md border px-2 py-1 disabled:opacity-50"
            aria-label="Siguiente"
            onClick={() => setPageIndex((i) => Math.min(totalPages - 1, i + 1))}
            disabled={clampedPageIndex >= totalPages - 1 || totalRows === 0}
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}


