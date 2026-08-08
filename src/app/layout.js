import "./globals.css";
import Script from "next/script";
import { Toaster } from "sonner";

export const metadata = {
  metadataBase: new URL("https://www.kyuverse.my.id"),

  title: {
    default:
      "Kyuverse — Tools, Websites & Resources for Anime Convention Creators",
    template: "%s | Kyuverse",
  },

  description:
    "Creator tools, custom websites, and resources for anime convention creators. Plan budgets, manage commissions, showcase portfolios, and grow your creative presence.",

  keywords: [
    "anime convention creator",
    "cosplay budget calculator",
    "commission calculator",
    "merchant profit calculator",
    "event cost calculator",
    "anime convention planner",
    "artist tools",
    "cosplayer tools",
    "photographer tools",
    "merchant tools",
    "creator tools",
    "artist portfolio",
    "photographer portfolio",
    "portfolio website",
    "custom website",
    "creator website",
    "anime convention tools",
    "artist alley tools",
    "creator resources",
    "japanese pop culture",
    "idol manager tools",
    "idol agency website",
    "talent portfolio website",
  ],

  alternates: {
    canonical: "https://www.kyuverse.my.id",
  },

  openGraph: {
    title:
      "Kyuverse — Tools, Websites & Resources for Anime Convention Creators",

    description:
      "Creator tools, custom websites, and resources for artists, cosplayers, photographers, merchants, and convention communities.",

    url: "https://www.kyuverse.my.id",

    siteName: "Kyuverse",

    images: [
      {
        url: "https://www.kyuverse.my.id/og-image-v2.webp",
        width: 1200,
        height: 630,
        alt: "Kyuverse - Tools & Websites for Anime Convention Creators",
      },
    ],

    locale: "id_ID",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Kyuverse — Tools, Websites & Resources for Anime Convention Creators",

    description:
      "Creator tools, custom websites, convention planning resources, portfolio solutions, and utilities for anime convention creators.",

    images: ["https://www.kyuverse.my.id/og-image-v2.webp"],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/id=G-0GZ6LJSJ70"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];

            function gtag() {
              dataLayer.push(arguments);
            }

            gtag('js', new Date());

            gtag('config', 'G-0GZ6LJSJ70');
          `}
        </Script>

        {/* JSON-LD Structured Data */}
        <Script id="structured-data" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",

            name: "Kyuverse",

            url: "https://www.kyuverse.my.id",

            description:
              "Creator tools, custom websites, and resources for anime convention creators.",

            publisher: {
              "@type": "Organization",
              name: "Kyuverse",
              url: "https://www.kyuverse.my.id",
            },
          })}
        </Script>
      </head>

      <body className="bg-[#0a0a0c] text-foreground antialiased">
        {/* Background Effects */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none will-change-transform">
          {/* Cyan Glow */}
          <div
            className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full opacity-[0.07]"
            style={{
              background:
                "radial-gradient(circle, #22d3ee 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />

          {/* Blue Glow */}
          <div
            className="absolute top-[40vh] -left-40 w-[600px] h-[600px] rounded-full opacity-[0.05]"
            style={{
              background:
                "radial-gradient(circle, #3b82f6 0%, transparent 70%)",
              filter: "blur(90px)",
            }}
          />

          {/* Purple Glow */}
          <div
            className="absolute top-[70vh] -right-40 w-[500px] h-[500px] rounded-full opacity-[0.05]"
            style={{
              background:
                "radial-gradient(circle, #a855f7 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />

          {/* Bottom Glow */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full opacity-[0.05]"
            style={{
              background:
                "radial-gradient(circle, #22d3ee 0%, transparent 70%)",
              filter: "blur(100px)",
            }}
          />

          {/* Grid */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(34,211,238,1) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,1) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        {children}

        {/* Global Sonner Toaster (Pojok Kanan Atas + HP Bar Animation) */}
        <Toaster
          theme="dark"
          position="top-right"
          duration={2000}
          visibleToasts={3}
          toastOptions={{
            style: {
              background: "rgba(18, 18, 22, 0.95)",
              border: "1px solid rgba(34, 211, 238, 0.35)",
              color: "#22d3ee",
              backdropFilter: "blur(12px)",
              borderRadius: "0.75rem",
              fontSize: "0.85rem",
              fontWeight: "600",
              boxShadow: "0 0 20px rgba(34, 211, 238, 0.15)",
              paddingBottom: "12px",
            },
          }}
        />
      </body>
    </html>
  );
}