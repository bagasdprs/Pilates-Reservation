import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Join Diro Pilates today and start your journey.",
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
