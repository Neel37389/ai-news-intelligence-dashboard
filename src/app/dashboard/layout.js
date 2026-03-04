"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LayoutDashboard, Newspaper, BarChart3, Bookmark } from "lucide-react";

export default function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Articles", href: "/dashboard/articles", icon: Newspaper },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { name: "Saved", href: "/dashboard/saved", icon: Bookmark },
  ];

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Sidebar */}
      <aside
        className={`${
          collapsed ? "w-20" : "w-64"
        } transition-all duration-300 border-r border-border flex flex-col`}
      >
        <div className="h-14 flex items-center px-4 font-semibold">
          {!collapsed && "AI News"}
        </div>

        <Separator />

        <nav className="flex flex-col gap-2 p-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link key={item.href} href={item.href}>
                <button
                  variant={isActive ? "secondary" : "ghost"}
                  className={`w-full flex items-center gap-3 justify-start text-lg px-3 py-2 rounded-md transition-colors ${isActive ? "bg-muted text-foreground font-semibold" : "hover:bg-muted/80 text-muted-foreground"}`}
                >
                  <Icon className="h-5 w-5" />
                  {!collapsed && item.name}
                </button>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto p-3">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setCollapsed((prev) => !prev)}
          >
            {collapsed ? ">" : "<"}
          </Button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b border-border flex items-center px-6 font-medium">
          AI News Intelligence Dashboard
        </header>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
