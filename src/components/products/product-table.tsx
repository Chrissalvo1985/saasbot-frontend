"use client";
import * as React from "react";
import { useMemo, useState } from "react";
import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, Search, AlertCircle } from "lucide-react";

type Product = {
  sku: string;
  name: string;
  price: number;
  stock: number;
  status: "activo" | "borrador";
  tags?: string[];
};

const MOCK_PRODUCTS: Product[] = Array.from({ length: 48 }).map((_, i) => ({
  sku: `SKU-${1000 + i}`,
  name: i % 5 === 0 ? `Zapatillas Breeze ${i}` : `Producto Demo ${i}`,
  price: 9990 + (i % 7) * 3000,
  stock: i % 9 === 0 ? 0 : 3 + (i % 12),
  status: i % 6 === 0 ? "borrador" : "activo",
  tags: i % 4 === 0 ? ["destacado", "invierno"] : ["clásico"],
}));

export function ProductTable() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () =>
      MOCK_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.sku.toLowerCase().includes(query.toLowerCase())
      ),
    [query]
  );

  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      {
        header: "SKU",
        accessorKey: "sku",
        cell: ({ getValue }) => (
          <span className="font-mono text-xs">{String(getValue())}</span>
        ),
      },
      { header: "Nombre", accessorKey: "name" },
      {
        header: "Precio",
        accessorKey: "price",
        cell: ({ getValue }) => "$" + Number(getValue()).toLocaleString(),
      },
      {
        header: "Stock",
        accessorKey: "stock",
        cell: ({ row }) => (
          <span className={row.original.stock === 0 ? "text-rose-600" : ""}>
            {row.original.stock}
          </span>
        ),
      },
      {
        header: "Estado",
        accessorKey: "status",
        cell: ({ getValue }) => (
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs border ${
              getValue() === "activo"
                ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800"
                : "bg-zinc-50 text-zinc-700 border-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800"
            }`}
          >
            ● {String(getValue())}
          </span>
        ),
      },
    ],
    []
  );

  const table = useReactTable({ data: filtered, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      <div className="p-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre o SKU"
            className="w-full rounded-md border border-zinc-200 dark:border-zinc-800 pl-8 pr-3 py-2 text-sm bg-transparent"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-md border px-3 py-2 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900">Filtros</button>
          <button className="rounded-md border px-3 py-2 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900">Exportar</button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id} className="border-t border-zinc-200 dark:border-zinc-800">
                {hg.headers.map((h) => (
                  <th key={h.id} className="text-left px-3 py-2 font-medium text-zinc-500">
                    {flexRender(h.column.columnDef.header, h.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-t border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/20">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-3 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filtered.length === 0 && (
        <div className="p-6 flex items-center gap-3 text-sm text-zinc-500">
          <AlertCircle className="size-4" /> No hay resultados para &quot;{query}&quot;.
        </div>
      )}
      <div className="border-t border-zinc-200 dark:border-zinc-800 p-3 flex items-center justify-between text-xs text-zinc-500">
        <span>{filtered.length} productos</span>
        <div className="flex items-center gap-1">
          <button className="rounded-md border px-2 py-1" aria-label="Anterior">
            <ChevronLeft className="size-4" />
          </button>
          <button className="rounded-md border px-2 py-1" aria-label="Siguiente">
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}


