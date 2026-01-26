"use client";

import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, Mail, Megaphone } from "lucide-react";

function NotificationsTab() {
  return (
    <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
      <h3 className="text-lg font-bold mb-1">Notification Preferences</h3>
      <p className="text-sm text-zinc-500 mb-8">Customize how you want to be contacted.</p>

      <div className="space-y-8 w-full">
        {/* Item 1 */}
        <div className="flex items-start gap-4">
          <div className="bg-zinc-100 p-2.5 rounded-full">
            <Bell className="h-5 w-5 text-zinc-600" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <Label htmlFor="reminders" className="text-base font-semibold">
                Class Reminders
              </Label>
              <Switch id="reminders" defaultChecked />
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed pr-10">Receive timely alerts 2 hours before your scheduled classes, and get notified when a waitlist spot opens up.</p>
          </div>
        </div>

        {/* Item 2 */}
        <div className="flex items-start gap-4">
          <div className="bg-zinc-100 p-2.5 rounded-full">
            <Megaphone className="h-5 w-5 text-zinc-600" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <Label htmlFor="marketing" className="text-base font-semibold">
                Marketing Emails
              </Label>
              <Switch id="marketing" />
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed pr-10">Stay updated with our weekly newsletter featuring wellness tips, new class announcements, and exclusive discounts.</p>
          </div>
        </div>

        {/* Item 3 */}
        <div className="flex items-start gap-4">
          <div className="bg-zinc-100 p-2.5 rounded-full">
            <Mail className="h-5 w-5 text-zinc-600" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <Label htmlFor="system" className="text-base font-semibold">
                System Updates
              </Label>
              <Switch id="system" defaultChecked />
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed pr-10">Important service announcements regarding your subscription, policy changes, and platform maintenance.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationsTab;
