import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MorningSignal — one useful health decision",
  description: "A transparent demo that turns wearable signals into one bounded morning action.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
