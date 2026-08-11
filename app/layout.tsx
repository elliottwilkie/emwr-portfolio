import type { Metadata } from "next";
import "./globals.css";
import { HapticPrimer, ThemeToggle } from "./SiteChrome";

export const metadata: Metadata = {
  title: "Elliott Wilkie-Roşca — Product Designer",
  description:
    "Product designer with 12+ years of experience simplifying complex products across healthcare, AI, e-commerce, and emerging technology.",
  openGraph: {
    title: "Elliott Wilkie-Roşca — Product Designer",
    description:
      "Product designer with 12+ years of experience simplifying complex products.",
    url: "https://www.emwr.me",
    siteName: "Elliott Wilkie-Roşca",
    type: "website",
    images: [{ url: "/og-social.png", width: 1731, height: 909 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Elliott Wilkie-Roşca — Product Designer",
    description:
      "Product designer with 12+ years of experience simplifying complex products.",
    images: ["/og-social.png"],
  },
  icons: {
    icon: "/media/0QpuKyoDpJJV5GaOYH7NERLktb0.png",
    shortcut: "/media/0QpuKyoDpJJV5GaOYH7NERLktb0.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('emwr-theme');document.documentElement.dataset.theme=t||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light')}catch(e){}})()` }} /></head>
      <body><HapticPrimer /><ThemeToggle />{children}</body>
    </html>
  );
}
