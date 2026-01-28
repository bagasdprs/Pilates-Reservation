import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Classes",
  description: "Browse and book your pilates sessions.",
};

export default function ClassesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
