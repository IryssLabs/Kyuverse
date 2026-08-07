import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommissionCalculatorClient from "@/features/commission-calculator/components/CommissionCalculatorClient";

// ================= SEO METADATA =================
export const metadata = {
  title: "Art Commission & Cosplay Rental Price Calculator",
  description:
    "Calculate fair art commission rates and cosplay rental pricing. Tailored for artists, cosplayers, and creators in Indonesia, SEA, and worldwide.",
  keywords: [
    "art commission calculator",
    "cosplay rental price calculator",
    "commission pricing tool",
    "freelance artist rate calculator",
    "artist alley pricing",
    "indonesia artist commission",
  ],
  alternates: {
    canonical: "https://www.kyuverse.my.id/tools/commission-calculator",
  },
  openGraph: {
    title: "Art Commission & Cosplay Rental Price Calculator — Kyuverse",
    description:
      "Calculate fair pricing for art commissions and cosplay rentals with live exchange rates.",
    url: "https://www.kyuverse.my.id/tools/commission-calculator",
    siteName: "Kyuverse",
    images: [
      {
        url: "https://www.kyuverse.my.id/og-image-v2.webp",
        width: 1200,
        height: 630,
        alt: "Kyuverse Commission & Cosplay Rental Calculator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Art Commission & Cosplay Rental Price Calculator — Kyuverse",
    description:
      "Calculate fair pricing for art commissions and cosplay rentals easily.",
    images: ["https://www.kyuverse.my.id/og-image-v2.webp"],
  },
};

export default function CommissionCalculatorPage() {
  // Structured Data (WebApplication Schema)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Kyuverse Commission & Cosplay Rental Calculator",
    description:
      "Interactive pricing calculator for digital artists and cosplayers in SEA and global communities.",
    url: "https://www.kyuverse.my.id/tools/commission-calculator",
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    provider: {
      "@type": "Organization",
      name: "Kyuverse",
      url: "https://www.kyuverse.my.id",
    },
  };

  return (
    <>
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CommissionCalculatorClient />
    </>
  );
}