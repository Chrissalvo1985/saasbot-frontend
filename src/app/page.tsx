import { SidebarShell } from "@/components/shell/sidebar-shell";
import { DashboardHome } from "@/components/dashboard/home";

export default function Home() {
  return (
    <SidebarShell>
      <DashboardHome />
    </SidebarShell>
  );
}
