"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Globe } from "lucide-react";

function AccountTab() {
  return (
    <div className="space-y-6">
      {/* SECURITY */}
      <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
        <h3 className="text-lg font-bold mb-1">Security & Login</h3>
        <p className="text-sm text-zinc-500 mb-6">Update your password to keep your account secure.</p>

        <div className="space-y-4 max-w-2xl">
          <div className="space-y-2">
            <Label>Current Password</Label>
            <Input type="password" placeholder="Enter current password" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>New Password</Label>
              <Input type="password" placeholder="Min. 8 characters" />
            </div>
            <div className="space-y-2">
              <Label>Confirm Password</Label>
              <Input type="password" placeholder="Confirm new password" />
            </div>
          </div>
          <div className="pt-2">
            <Button className="bg-zinc-900 text-white hover:bg-zinc-800">Update Password</Button>
          </div>
        </div>
      </div>

      {/* GENERAL PREFERENCES */}
      <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
        <h3 className="text-lg font-bold mb-1">General Preferences</h3>
        <p className="text-sm text-zinc-500 mb-6">Manage your contact info and regional settings.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          <div className="space-y-2">
            <Label>Linked Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
              <Input className="pl-10" defaultValue="+62 812 3456 7890" disabled />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Language</Label>
            <Select defaultValue="en">
              <SelectTrigger className="pl-10 relative">
                <Globe className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English (United States)</SelectItem>
                <SelectItem value="id">Bahasa Indonesia</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="pt-6 flex justify-end">
          <Button variant="outline" className="mr-2">
            Cancel
          </Button>
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}

export default AccountTab;
