import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/data/site";

const bandeinsStrange = localFont({
  src: "../public/fonts/Bandeins-Strange-Variable-VF.ttf",
  variable: "--font-strange",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Web Developer & Interactive Designer`,
    template: `%s | ${site.name}`
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  keywords: [
    "Zac Dagostino",
    "Perth web developer",
    "interactive designer",
    "Next.js developer",
    "ecommerce developer",
    "WebGL websites"
  ],
  openGraph: {
    title: `${site.name} | Web Developer & Interactive Designer`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en_AU",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Web Developer & Interactive Designer`,
    description: site.description
  },
  alternates: {
    canonical: site.url
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FDE8CD",
  colorScheme: "light"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU">
      <body className={bandeinsStrange.variable}>{children}</body>
    </html>
  );
}
