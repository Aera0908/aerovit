import type { Metadata } from "next";
import { Rajdhani } from "next/font/google";
import "./globals.css";

const rajdhani = Rajdhani({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-rajdhani",
});

export const metadata: Metadata = {
  title: "Aerovit | Gamified Hybrid AI Fitness Platform",
  description: "Transform your fitness journey with cutting-edge AI coaching, custom wearable technology, and blockchain-powered rewards. Level up reality with Aerovit.",
  keywords: ["fitness", "AI", "wearable", "blockchain", "gamification", "workout", "health"],
  authors: [{ name: "Aerovit Team" }],
  openGraph: {
    title: "Aerovit | Level Up Reality",
    description: "Hybrid AI Fitness Platform with Web3 Rewards",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${rajdhani.variable} font-sans antialiased bg-[#020202] text-white`}>
        {children}
      </body>
    </html>
  );
}
