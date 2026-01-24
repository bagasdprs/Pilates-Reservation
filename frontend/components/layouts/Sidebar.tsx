"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, CalendarDays, User, Settings, LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: CalendarDays, label: "Classes", href: "/dashboard/classes" },
  { icon: User, label: "Profile", href: "/dashboard/profile" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={cn("relative flex h-screen flex-col border-r bg-sidebar py-6 transition-all duration-300 ease-in-out", isCollapsed ? "w-20 px-2" : "w-64 px-4")}>
      {/* Toggle Button */}
      <Button variant="ghost" size="icon" className="absolute -right-3 top-9 z-50 h-6 w-6 rounded-full border bg-background shadow-md hover:bg-sidebar-accent" onClick={() => setIsCollapsed(!isCollapsed)}>
        {isCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </Button>

      {/* Logo Area */}
      <div className={cn("mb-8 flex items-center gap-2", isCollapsed ? "justify-center px-0" : "px-2")}>
        {/* Update: bg-zinc-900 jadi bg-sidebar-primary (Pink) */}
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
          <span className="text-lg font-bold">D</span>
        </div>
        {!isCollapsed && <span className="text-xl font-bold tracking-tight text-sidebar-foreground overflow-hidden whitespace-nowrap transition-all duration-300">DiroPilates</span>}
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 space-y-2">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-lg py-2.5 text-sm font-medium transition-colors",
                // Update Logic Warna:
                // Active: Background Pink Muda (sidebar-accent) & Teks Pink Tua (sidebar-primary)
                // Inactive: Hover jadi Pink Muda & Teks jadi Pink Tua
                isActive ? "bg-sidebar-accent text-sidebar-primary" : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-primary",
                isCollapsed ? "justify-center px-0" : "px-3",
              )}
            >
              <item.icon className={cn("h-5 w-5 shrink-0 transition-colors", isActive ? "text-sidebar-primary" : "text-muted-foreground group-hover:text-sidebar-primary")} />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User Profile Snippet */}
      <div className="border-t pt-4 border-sidebar-border">
        <div className={cn("flex items-center gap-3 mb-4", isCollapsed ? "justify-center" : "px-2")}>
          <div className="h-10 w-10 shrink-0 rounded-full bg-muted" />
          {!isCollapsed && (
            <div className="flex flex-col overflow-hidden">
              <span className="truncate text-sm font-semibold text-sidebar-foreground">Bagas D.</span>
              <span className="truncate text-xs text-muted-foreground">Premium Member</span>
            </div>
          )}
        </div>

        <Button variant="outline" className={cn("w-full gap-2 text-red-500 hover:text-red-600 hover:bg-red-50", isCollapsed ? "justify-center px-0" : "justify-start")}>
          <LogOut className="h-4 w-4 shrink-0" />
          {!isCollapsed && "Sign Out"}
        </Button>
      </div>
    </div>
  );
}

export default Sidebar;
