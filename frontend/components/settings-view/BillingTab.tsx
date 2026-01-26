"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CreditCard, Download, Gem, Plus } from "lucide-react";

function BillingTab() {
  const invoices = [
    { id: "#INV-2026-009", date: "Jan 24, 2026", amount: "$35.00", status: "Paid" },
    { id: "#INV-2026-008", date: "Dec 24, 2025", amount: "$35.00", status: "Paid" },
    { id: "#INV-2025-007", date: "Nov 24, 2025", amount: "$35.00", status: "Paid" },
    { id: "#INV-2025-006", date: "Oct 24, 2025", amount: "$35.00", status: "Refunded" },
  ];

  return (
    <div className="space-y-6">
      {/* CURRENT PLAN */}
      <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-lg font-bold">Premium Member</h3>
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                ACTIVE
              </Badge>
            </div>
            <p className="text-sm text-zinc-500">$35.00 / month • Renews on Feb 24, 2026</p>
          </div>
          <div className="bg-zinc-100 p-2 rounded-full hidden md:block">
            <Gem className="h-6 w-6 text-primary" />
          </div>
        </div>

        {/* Progress Bar Logic */}
        <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-100 mb-6">
          <div className="flex justify-between text-xs font-semibold mb-2">
            <span>2 days used</span>
            <span className="text-zinc-400">28 days remaining</span>
          </div>
          <div className="[&>*]:bg-emerald-500">
            <Progress value={8} className="h-2 bg-zinc-200" />
          </div>
        </div>

        <div className="flex gap-3">
          <Button className="bg-zinc-900 text-white">Change Plan</Button>
          <Button variant="outline">Cancel Subscription</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* PAYMENT METHODS */}
        <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm md:col-span-1">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">Payment Method</h3>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Card Visual */}
          <div className="border border-zinc-200 rounded-xl p-4 relative overflow-hidden group hover:border-primary transition-all cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <CreditCard className="h-6 w-6 text-primary" />
              <Badge variant="outline" className="text-[10px] border-zinc-300">
                DEFAULT
              </Badge>
            </div>
            <p className="font-mono text-zinc-500 mb-1">**** **** **** 4242</p>
            <div className="flex justify-between text-xs text-zinc-400">
              <span>Visa</span>
              <span>Exp 12/28</span>
            </div>
          </div>
          <Button variant="link" className="text-primary text-xs pl-0 mt-2">
            + Add Payment Method
          </Button>
        </div>

        {/* BILLING HISTORY */}
        <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm md:col-span-2">
          <h3 className="font-bold mb-4">Billing History</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell className="font-medium text-xs">{inv.id}</TableCell>
                  <TableCell className="text-xs text-zinc-500">{inv.date}</TableCell>
                  <TableCell className="text-xs font-bold">{inv.amount}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={`text-[10px] ${inv.status === "Paid" ? "bg-green-100 text-green-700" : "bg-zinc-100 text-zinc-500"}`}>
                      {inv.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Download className="h-3 w-3 text-zinc-400" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default BillingTab;
