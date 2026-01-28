import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile",
  description: "Manage your personal information.",
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
