import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WAGYU MASTER VN | Japan's No.1 Wagyu Company",
  description: "Comprehensive Japanese Wagyu brands, cattle farmers, and official registry database.",
  keywords: ["Wagyu Master VN", "Wagyu Brands", "Kobe Beef", "Matsusaka Beef", "Japan Wagyu Directory"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-washi-texture selection:bg-hanko-700 selection:text-white">
        {children}
      </body>
    </html>
  );
}