"use client";
import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, Search, AlertCircle } from "lucide-react";
import { Modal } from "@/components/ui/modal";

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
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [pageSize, setPageSize] = useState<10 | 50 | 100>(10);
  const [pageIndex, setPageIndex] = useState(0);
  const [filters, setFilters] = useState<{
    status: "any" | "activo" | "borrador";
    stock: "any" | "in" | "out";
    minPrice: string;
    maxPrice: string;
    tags: string[];
  }>({ status: "any", stock: "any", minPrice: "", maxPrice: "", tags: [] });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const min = filters.minPrice ? Number(filters.minPrice) : undefined;
    const max = filters.maxPrice ? Number(filters.maxPrice) : undefined;
    return MOCK_PRODUCTS.filter((p) => {
      if (q && !(p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q))) return false;
      if (filters.status !== "any" && p.status !== filters.status) return false;
      if (filters.stock === "in" && p.stock <= 0) return false;
      if (filters.stock === "out" && p.stock > 0) return false;
      if (min !== undefined && p.price < min) return false;
      if (max !== undefined && p.price > max) return false;
      if (filters.tags.length > 0) {
        const set = new Set(p.tags || []);
        if (!filters.tags.some((t) => set.has(t))) return false;
      }
      return true;
    });
  }, [query, filters]);

  // Reset to first page when filters/search/pageSize change
  useEffect(() => {
    setPageIndex(0);
  }, [query, filters, pageSize]);

  const totalRows = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / pageSize));
  const clampedPageIndex = Math.min(pageIndex, totalPages - 1);
  const pageStart = clampedPageIndex * pageSize;
  const pageEnd = Math.min(pageStart + pageSize, totalRows);
  const pageRows = useMemo(() => filtered.slice(pageStart, pageEnd), [filtered, pageStart, pageEnd]);

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
        cell: ({ getValue }) => "$" + Number(getValue()).toLocaleString("es-CL"),
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

  const table = useReactTable({ data: pageRows, columns, getCoreRowModel: getCoreRowModel() });

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
          <button
            className="rounded-md border px-3 py-2 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900"
            onClick={() => setFiltersOpen(true)}
          >
            Filtros
          </button>
          <button
            className="rounded-md border px-3 py-2 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900"
            onClick={() => setExportOpen(true)}
          >
            Exportar
          </button>
          <div className="hidden sm:flex items-center gap-2 ml-2 text-xs text-zinc-500">
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
      <div className="border-t border-zinc-200 dark:border-zinc-800 p-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs text-zinc-500">
        <div className="flex items-center gap-2">
          <span>
            {totalRows === 0 ? "0" : `${pageStart + 1}–${pageEnd}`} de {totalRows} productos
          </span>
          <div className="flex items-center gap-2 sm:hidden">
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
            <ChevronLeft className="size-4" />
          </button>
          <span className="px-2">{totalRows === 0 ? 0 : clampedPageIndex + 1}/{totalPages}</span>
          <button
            className="rounded-md border px-2 py-1 disabled:opacity-50"
            aria-label="Siguiente"
            onClick={() => setPageIndex((i) => Math.min(totalPages - 1, i + 1))}
            disabled={clampedPageIndex >= totalPages - 1 || totalRows === 0}
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
      <Modal
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        title="Filtros"
        description="Refina los resultados del catálogo"
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Estado</label>
              <select
                className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900"
                value={filters.status}
                onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value as "any" | "activo" | "borrador" }))}
              >
                <option value="any">Todos</option>
                <option value="activo">Activo</option>
                <option value="borrador">Borrador</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Stock</label>
              <select
                className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900"
                value={filters.stock}
                onChange={(e) => setFilters((f) => ({ ...f, stock: e.target.value as "any" | "in" | "out" }))}
              >
                <option value="any">Todos</option>
                <option value="in">Con stock</option>
                <option value="out">Sin stock</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium mb-1">Precio mín.</label>
                <input
                  type="number"
                  className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900"
                  value={filters.minPrice}
                  onChange={(e) => setFilters((f) => ({ ...f, minPrice: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Precio máx.</label>
                <input
                  type="number"
                  className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters((f) => ({ ...f, maxPrice: e.target.value }))}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Tags</label>
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(MOCK_PRODUCTS.flatMap((p) => p.tags || []))).map((tag) => (
                <label key={tag} className="inline-flex items-center gap-2 rounded-md border border-zinc-200 px-2 py-1 text-xs dark:border-zinc-800">
                  <input
                    type="checkbox"
                    className="accent-zinc-900 dark:accent-zinc-100"
                    checked={filters.tags.includes(tag)}
                    onChange={(e) =>
                      setFilters((f) => ({
                        ...f,
                        tags: e.target.checked ? [...f.tags, tag] : f.tags.filter((t) => t !== tag),
                      }))
                    }
                  />
                  {tag}
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
              onClick={() => setFilters({ status: "any", stock: "any", minPrice: "", maxPrice: "", tags: [] })}
            >
              Limpiar
            </button>
            <button
              type="button"
              className="rounded-md bg-zinc-900 px-3 py-2 text-sm text-white hover:opacity-95"
              onClick={() => setFiltersOpen(false)}
            >
              Aplicar
            </button>
          </div>
        </div>
      </Modal>

      <ExportModal
        open={exportOpen}
        onClose={() => setExportOpen(false)}
        rows={filtered}
      />
    </div>
  );
}


type ExportModalProps = {
  open: boolean;
  onClose: () => void;
  rows: Product[];
};

function ExportModal({ open, onClose, rows }: ExportModalProps) {
  const [format, setFormat] = useState<"csv" | "json">("csv");
  const [delimiter, setDelimiter] = useState<"," | ";">(",");

  function download(filename: string, content: string, mime: string) {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  function toCsv(data: Product[]) {
    const headers = ["sku", "name", "price", "stock", "status", "tags"];
    const lines = [headers.join(delimiter)];
    for (const p of data) {
      const row = [
        p.sku,
        p.name.replaceAll(delimiter, " "),
        String(p.price),
        String(p.stock),
        p.status,
        (p.tags || []).join("|")
      ];
      lines.push(row.join(delimiter));
    }
    return lines.join("\n");
  }

  function handleExport() {
    if (format === "json") {
      download("productos.json", JSON.stringify(rows, null, 2), "application/json");
    } else {
      download("productos.csv", toCsv(rows), "text/csv;charset=utf-8;");
    }
    onClose();
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Exportar productos"
      description="Exporta los productos filtrados al formato deseado"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Formato</label>
            <select
              className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900"
              value={format}
              onChange={(e) => setFormat((e.target.value as "csv" | "json"))}
            >
              <option value="csv">CSV</option>
              <option value="json">JSON</option>
            </select>
          </div>
          {format === "csv" && (
            <div>
              <label className="block text-sm font-medium mb-1">Separador</label>
              <select
                className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900"
                value={delimiter}
                onChange={(e) => setDelimiter((e.target.value as "," | ";"))}
              >
                <option value=",">Coma (,)</option>
                <option value=";">Punto y coma (;)</option>
              </select>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium mb-1">Incluidos</label>
            <div className="rounded-md border border-zinc-200 p-2 text-xs text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
              {rows.length} filas (aplican filtros y búsqueda)
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="rounded-md bg-zinc-900 px-3 py-2 text-sm text-white hover:opacity-95"
            onClick={handleExport}
          >
            Exportar
          </button>
        </div>
      </div>
    </Modal>
  );
}

