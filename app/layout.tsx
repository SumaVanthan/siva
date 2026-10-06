import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Swetha & Shivaanandha | 13 November 2026",
  description: "Together with our families, join us for our wedding in Madurai and reception in Trichy. திருமண அழைப்பிதழ் — சுவேதா & சிவானந்தபாண்டியன்.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head><meta name="theme-color" content="#fcf9f2"/></head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
