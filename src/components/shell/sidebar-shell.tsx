"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Bot, Package, CalendarDays, BarChart3, Settings, Home, BookOpenText, Users, FileText } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

const navItems: NavItem[] = [
  { label: "Inicio", href: "/", icon: Home },
  { label: "Bots", href: "/bots", icon: Bot },
  { label: "Catálogo", href: "/catalogo", icon: Package },
  { label: "Inventario", href: "/inventario", icon: BookOpenText },
  { label: "Agenda", href: "/agenda", icon: CalendarDays },
  { label: "Métricas", href: "/metricas", icon: BarChart3 },
  { label: "Clientes", href: "/clientes", icon: Users },
  { label: "Base de Conocimiento", href: "/kb", icon: FileText },
  { label: "Ajustes", href: "/ajustes", icon: Settings },
];

export function SidebarShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[260px_1fr]">
      {/* Sidebar */}
      <aside
        className={`fixed top-14 bottom-0 left-0 z-40 w-72 transform bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 p-4 transition-transform duration-200 lg:static lg:translate-x-0 lg:top-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="grid size-11 place-items-center rounded-full bg-zinc-100 dark:bg-zinc-900 ring-1 ring-zinc-200 dark:ring-zinc-800">
              <div className="relative size-9">
                <Image src="/logo.png" alt="SaaSBot" fill sizes="36px" className="object-contain" priority />
              </div>
            </div>
            <span className="font-semibold">SaaSBot</span>
          </div>
          <button className="lg:hidden" onClick={() => setOpen(false)} aria-label="Cerrar menú">
            <X className="size-5" />
          </button>
        </div>
        <nav className="mt-6 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                    : "hover:bg-zinc-100 dark:hover:bg-zinc-900/30"
                }`}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-8 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Multi‑tenant activo. 14 días de prueba restantes.
          </p>
        </div>
      </aside>

      {/* Backdrop for mobile drawer (does not cover header) */}
      {open && (
        <button
          aria-label="Cerrar menú"
          onClick={() => setOpen(false)}
          className="fixed top-14 bottom-0 left-0 right-0 z-30 bg-black/40 lg:hidden"
        />
      )}

      {/* Content */}
      <div className="lg:col-start-2">
        <header className="sticky top-0 z-50 bg-white/70 dark:bg-zinc-950/70 backdrop-blur border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between px-4 h-14">
            <div className="flex items-center gap-2">
              <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="Abrir menú">
                <Menu className="size-5" />
              </button>
              <h1 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Plataforma de Soporte y Automatización
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <UserMenu />
            </div>
          </div>
        </header>
        <main className="p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

 

function UserMenu() {
  return (
    <div className="inline-flex items-center gap-3">
      <div className="text-right hidden sm:block">
        <div className="text-sm font-medium">Chris</div>
        <div className="text-xs text-zinc-500 dark:text-zinc-400">Owner</div>
      </div>
      <div className="size-8 rounded-full bg-gradient-to-br from-zinc-200 to-zinc-400 dark:from-zinc-700 dark:to-zinc-900" />
    </div>
  );
}


