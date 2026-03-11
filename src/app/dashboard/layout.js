"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SavedArticlesContext } from "@/context/SavedArticlesContext";
import { Separator } from "@/components/ui/separator";
import { LayoutDashboard, Newspaper, BarChart3, Bookmark } from "lucide-react";

export default function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [savedIds, setSavedIds] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("savedArticles");
    if (stored) setSavedIds(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("savedArticles", JSON.stringify(savedIds));
  }, [savedIds]);

  const pathname = usePathname();

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Articles", href: "/dashboard/articles", icon: Newspaper },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { name: "Saved", href: "/dashboard/saved", icon: Bookmark },
  ];

  const currentName = navItems.find((item) => item.href === pathname);

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Sidebar */}
      <aside
        className={`${
          collapsed ? "w-20" : "w-64"
        } bg-sidebar text-sidebar-foreground transition-all duration-300 border-r border-sidebar-border flex flex-col`}
      >
        {/* Logo */}
        <div className="h-14 flex items-center gap-3 px-3 font-semibold">
          <Image
            src="/icon.png"
            alt="AI News Logo"
            width={20}
            height={20}
            className="invert"
          />
          {!collapsed && "AI News"}
        </div>

        <Separator />

        {/* Navigation */}
        <nav className="flex flex-col gap-1 p-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link key={item.href} href={item.href}>
                <button
                  className={`w-full flex items-center gap-3 justify-start text-sm px-3 py-2 rounded-lg transition-colors
                  ${
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "hover:bg-sidebar-accent text-sidebar-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5" />

                  {!collapsed && (
                    <>
                      {item.name}

                      {item.name === "Saved" && savedIds.length > 0 && (
                        <span className="ml-auto text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-md">
                          {savedIds.length}
                        </span>
                      )}
                    </>
                  )}
                </button>
              </Link>
            );
          })}
        </nav>

        {/* Collapse button */}
        <div className="mt-auto p-3">
          <Button
            variant="secondary"
            className="w-full transition hover:bg-accent"
            onClick={() => setCollapsed((prev) => !prev)}
          >
            {collapsed ? ">" : "<"}
          </Button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b border-border bg-card flex items-center px-6 font-medium">
          {currentName?.name}
        </header>

        <main className="flex-1 p-6">
          <SavedArticlesContext.Provider value={{ savedIds, setSavedIds }}>
            {children}
          </SavedArticlesContext.Provider>
        </main>
      </div>
    </div>
  );
}
