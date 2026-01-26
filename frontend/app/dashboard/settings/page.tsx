"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, CreditCard, Bell } from "lucide-react";
import AccountTab from "@/components/settings-view/AccountTab";
import BillingTab from "@/components/settings-view/BillingTab";
import NotificationsTab from "@/components/settings-view/NotificationsTab";

function SettingsPage() {
  return (
    <div className="flex flex-col gap-6 p-6 min-h-screen bg-zinc-50/50">
      {/* HEADER PAGE */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground text-sm">Manage your account and preferences.</p>
        </div>
        {/* Opsional: Avatar kecil di kanan kalau mau */}
      </div>

      {/* TABS */}
      <Tabs defaultValue="account" className="w-full space-y-6">
        {/* Navigation Bar  */}
        <div className="border-b border-zinc-200">
          <TabsList className="w-full justify-start h-auto p-0 bg-transparent gap-8">
            <TabsTrigger
              value="account"
              className="rounded-none border-b-2 border-transparent px-2 pb-3 pt-2 font-medium text-muted-foreground shadow-none bg-transparent data-[state=active]:border-primary data-[state=active]:text-primary hover:text-primary transition-all"
            >
              <User className="h-4 w-4 mr-2" /> Account
            </TabsTrigger>
            <TabsTrigger
              value="billing"
              className="rounded-none border-b-2 border-transparent px-2 pb-3 pt-2 font-medium text-muted-foreground shadow-none bg-transparent data-[state=active]:border-primary data-[state=active]:text-primary hover:text-primary transition-all"
            >
              <CreditCard className="h-4 w-4 mr-2" /> Billing & Plans
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="rounded-none border-b-2 border-transparent px-2 pb-3 pt-2 font-medium text-muted-foreground shadow-none bg-transparent data-[state=active]:border-primary data-[state=active]:text-primary hover:text-primary transition-all"
            >
              <Bell className="h-4 w-4 mr-2" /> Notifications
            </TabsTrigger>
          </TabsList>
        </div>

        {/* CONTENT AREA */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <TabsContent value="account">
            <AccountTab />
          </TabsContent>

          <TabsContent value="billing">
            <BillingTab />
          </TabsContent>

          <TabsContent value="notifications">
            <NotificationsTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

export default SettingsPage;
