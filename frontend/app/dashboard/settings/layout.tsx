import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account Settings",
  description: "Update your preferences and security settings.",
};

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
