import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Lora } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { siteConfig } from "@/lib/config";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexProvider } from "@/components/convex-provider";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const writer = localFont({
  src: "../public/fonts/writer.ttf",
  variable: "--font-writer",
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  creator: siteConfig.name,
  authors: [
    {
      name: siteConfig.name,
      url: new URL(siteConfig.authorUrl),
    },
  ],
  applicationName: siteConfig.title,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: new URL(siteConfig.url),
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: siteConfig.twitterHandle,
  },
  keywords: siteConfig.keywords,
  icons: {
    icon: [
      {
        url: "/trends.svg",
        href: "/trends.svg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <ConvexProvider>
        <html lang="en" suppressHydrationWarning>
          <body className={`${lora.variable} ${writer.variable} antialiased`}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </body>
        </html>
      </ConvexProvider>
    </ClerkProvider>
  );
}
