import type { Metadata } from "next";
import "./globals.css";
import { HapticPrimer, ThemeToggle } from "./SiteChrome";

export const metadata: Metadata = {
  metadataBase: new URL("https://emwr.me"),
  title: {
    default: "Elliott Wilkie-Roşca — Product Designer",
    template: "%s — Elliott Wilkie-Roşca",
  },
  description:
    "Product designer with 12+ years of experience simplifying complex products across healthcare, AI, e-commerce, and emerging technology.",
  openGraph: {
    title: "Elliott Wilkie-Roşca — Product Designer",
    description:
      "Product designer with 12+ years of experience simplifying complex products.",
    url: "https://emwr.me",
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
  const analyticsToken = process.env.NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN;

  return (
    <html lang="en" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('emwr-theme');document.documentElement.dataset.theme=t||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light')}catch(e){}})()` }} /></head>
      <body>
        <HapticPrimer /><ThemeToggle />{children}
        {analyticsToken && (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({ token: analyticsToken })}
          />
        )}
      </body>
    </html>
  );
}
