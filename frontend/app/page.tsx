import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 gap-4">
      <h1 className="text-4xl font-bold text-zinc-900">Diro Pilates App</h1>
      <p className="text-zinc-500">Welcome to the reservation system</p>

      <div className="flex gap-4">
        <Link href="/dashboard">
          <Button>Go to Dashboard</Button>
        </Link>
        <Link href="/login">
          <Button>Go to Login</Button>
        </Link>
        {/* <Button variant="outline">Login</Button> */}
      </div>
    </div>
  );
}

export default Page;
