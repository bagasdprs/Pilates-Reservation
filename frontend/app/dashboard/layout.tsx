import React from "react";
import { Metadata } from "next";
import Sidebar from "@/components/layouts/Sidebar";
import MobileSidebar from "@/components/layouts/MobileSidebar";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your personalized dashboard to track sessions and progress.",
};

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-zinc-50/50">
      {/* 1. Sidebar Desktop (Hidden di Mobile, Muncul di MD keatas) */}
      <aside className="hidden border-r md:block">
        <Sidebar />
      </aside>

      {/* 2. Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="flex h-16 items-center border-b bg-white px-4 md:hidden">
          <MobileSidebar />
          <span className="ml-2 text-lg font-bold">DiroPilates</span>
        </div>

        {/* Content */}
        <div className="container mx-auto p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}

export default DashboardLayout;
