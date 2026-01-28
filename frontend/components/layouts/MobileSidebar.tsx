"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // Tambah useRouter
import { Menu, LayoutDashboard, CalendarDays, User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: CalendarDays, label: "Classes", href: "/dashboard/classes" },
  { icon: User, label: "Profile", href: "/dashboard/profile" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

function MobileSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  // 1. STATE USER
  const [user, setUser] = useState({ name: "Guest", role: "Member" });

  // 2. FETCH USER DATA
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storageData = localStorage.getItem("user_data");
        if (storageData) {
          const parsed = JSON.parse(storageData);

          if (parsed.name) {
            setUser({ name: parsed.name, role: "Member" });
          }

          const res = await fetch(`http://localhost:8080/api/profile/${parsed.id}`);
          if (res.ok) {
            const json = await res.json();
            setUser({
              name: json.data?.name || "Guest",
              role: json.data?.role || "Member",
            });
          }
        }
      } catch (e) {
        console.error("Gagal load user mobile sidebar", e);
      }
    };

    fetchUser();
  }, []);

  // 3. FUNGSI LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("user_data");
    setOpen(false);
    router.push("/login");
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-64 p-0 bg-sidebar border-r border-sidebar-border">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <div className="flex h-full flex-col py-6">
          {/* Logo Area */}
          <div className="mb-8 flex items-center gap-2 px-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <span className="text-lg font-bold">D</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-sidebar-foreground">DiroPilates</span>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 space-y-2 px-4">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive ? "bg-sidebar-accent text-sidebar-primary" : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-primary",
                  )}
                >
                  <item.icon className={cn("h-5 w-5 transition-colors", isActive ? "text-sidebar-primary" : "text-muted-foreground group-hover:text-sidebar-primary")} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* User Profile Snippet  */}
          <div className="border-t px-4 pt-4 border-sidebar-border">
            <div className="flex items-center gap-3 mb-4 px-2">
              <div className="h-10 w-10 shrink-0 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-600 font-bold border border-zinc-300">{(user?.name || "Guest").charAt(0).toUpperCase()}</div>

              <div className="flex flex-col overflow-hidden">
                <span className="truncate text-sm font-semibold text-sidebar-foreground">{user.name}</span>
                <span className="truncate text-xs text-muted-foreground capitalize">{user.role}</span>
              </div>
            </div>

            {/* Tombol Logout */}
            <Button variant="outline" onClick={handleLogout} className="w-full justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-50">
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default MobileSidebar;
