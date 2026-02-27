import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NepaliMatrimony - Nepal's Premier Matrimony Platform",
  description: "Nepal's most trusted matrimony platform with AI-powered matchmaking, verified profiles, and thousands of success stories. Find your perfect life partner today.",
  keywords: ["NepaliMatrimony", "Nepal", "Matrimony", "Wedding", "Matchmaking", "Nepali Singles", "Nepali Marriage", "AI Matchmaking"],
  authors: [{ name: "NepaliMatrimony Team" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "NepaliMatrimony - Nepal's Premier Matrimony Platform",
    description: "Find your perfect life partner with Nepal's most trusted matrimony platform",
    url: "https://nepalimatrimony.com",
    siteName: "NepaliMatrimony",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NepaliMatrimony - Nepal's Premier Matrimony Platform",
    description: "Find your perfect life partner with Nepal's most trusted matrimony platform",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
