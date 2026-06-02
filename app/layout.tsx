import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { AnalyticsProvider } from "@/components/analytics-provider";
import { OrganizationSchema } from "@/components/structured-data";
import { LenisProvider } from "@/components/lenis-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "SIRITECH | Web Developer Portfolio",
  description:
    "A modern portfolio for a web developer and full-stack engineer. Showcasing production-ready React, Next.js, and Typescript applications.",
  metadataBase: new URL("https://siridev.me"),
  openGraph: {
    title: "SIRITECH | Web Developer Portfolio",
    description:
      "A modern portfolio for a web developer and full-stack engineer. Showcasing production-ready React, Next.js, and TypeScript applications.",
    type: "website",
    locale: "en_US",
    images: ["/SIRITECH.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-icon-180x180.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "SIRITECH | Web Developer Portfolio",
    description:
      "A modern portfolio for a web developer and full-stack engineer. Showcasing production-ready React, Next.js, and TypeScript applications.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-background">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-HNPYBTJRKD"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-HNPYBTJRKD');
            `,
          }}
        />
        {/* Microsoft Clarity */}
        <Script
          id="clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "wzp38x0txh");
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <LenisProvider>
          <OrganizationSchema />
          {children}
          <Analytics />
          <AnalyticsProvider />
        </LenisProvider>
      </body>
    </html>
  );
}
