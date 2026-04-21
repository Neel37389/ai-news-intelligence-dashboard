"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  Newspaper,
  BarChart3,
  Bookmark,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [savedArticles, setSavedArticles] = useState([]);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
      }
    };
    checkUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  useEffect(() => {
    const fetchSaved = async () => {
      const res = await fetch("/api/saved-articles");
      const data = await res.json();
      setSavedArticles(data.data || []);
    };
    fetchSaved();
  }, [pathname]);

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Articles", href: "/dashboard/articles", icon: Newspaper },
    { name: "Saved", href: "/dashboard/saved", icon: Bookmark },
  ];

  const currentName = navItems.find((item) => item.href === pathname);

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Sidebar */}
      <aside
        className={`
    ${collapsed ? "sm:w-20" : "sm:w-64"}
    hidden sm:flex
    bg-sidebar text-sidebar-foreground
    transition-all duration-300
    border-r border-sidebar-border
    flex flex-col
  `}
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
                      ? "bg-primary text-sidebar-primary-foreground"
                      : "hover:bg-sidebar-accent text-sidebar-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5" />

                  {!collapsed && (
                    <>
                      {item.name}

                      {item.name === "Saved" && savedArticles.length > 0 && (
                        <span className="ml-auto text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-md">
                          {savedArticles.length}
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
        <header className="h-14 border-b border-border bg-card flex items-center px-3 sm:px-6 font-medium">
          {/* Mobile Dropdown */}
          <div className="sm:hidden w-full">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  <span>{currentName?.name}</span>
                  <ChevronDown className="h-4 w-4 opacity-60 transition-transform data-[state=open]:rotate-180" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                {navItems.map((item) => (
                  <DropdownMenuItem
                    key={item.href}
                    onClick={() => router.push(item.href)}
                  >
                    {item.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {/* Desktop Header */}
          <div className="hidden sm:flex items-center justify-between w-full">
            <span>{currentName?.name}</span>
            <Button variant="outline" onClick={handleLogout}>
              LogOut
            </Button>
          </div>
        </header>
        <main className="flex-1 p-3 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
