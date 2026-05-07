import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { profile } from "@/data/profile";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${profile.name} — ${profile.headline}`,
    template: `%s | ${profile.name}`
  },
  description: profile.bio,
  openGraph: {
    title: `${profile.name} — ${profile.headline}`,
    description: profile.bio,
    url: "https://josevener.vercel.app",
    siteName: profile.name,
    locale: "en_PH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.headline}`,
    description: profile.bio,
    creator: "@josevener",
  },
  keywords: ["Laravel", "React", "Next.js", "Node.js", "Full-Stack Developer", "Portfolio"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="mesh-gradient" />
        <div className="noise-bg" />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
