import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login Member",
  description: "Access your dashboard and manage your bookings.",
};

function LoginLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export default LoginLayout;
