import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
// Sesuaikan path import dengan tempat kamu menyimpan file ToolsCatalogClient.jsx
import ToolsCatalogClient from "@/components/tools/ToolsCatalogClient";

// ================= SEO METADATA =================
export const metadata = {
  title: "Creator Utility Tools Suite & Calculators — Kyuverse",
  description:
    "Explore powerful tools for anime convention creators, artists, cosplayers, and vendors. Calculate commission pricing, booth profits, print specs, and event budgets.",
  keywords: [
    "creator utility tools",
    "anime convention tools",
    "commission price calculator",
    "artist alley booth calculator",
    "print spec converter",
    "commission invoice generator",
    "cosplay budget planner",
    "artist alley checklist",
  ],
  alternates: {
    canonical: "https://www.kyuverse.my.id/tools",
  },
  openGraph: {
    title: "Creator Utility Tools Suite — Kyuverse",
    description:
      "Essential utilities and calculators designed for artists, cosplayers, photographers, and anime convention creators.",
    url: "https://www.kyuverse.my.id/tools",
    siteName: "Kyuverse",
    images: [
      {
        url: "https://www.kyuverse.my.id/og-image-v2.webp",
        width: 1200,
        height: 630,
        alt: "Kyuverse Creator Utility Tools Catalog",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Creator Utility Tools Suite — Kyuverse",
    description:
      "Essential utilities and calculators designed for artists, cosplayers, photographers, and anime convention creators.",
    images: ["https://www.kyuverse.my.id/og-image-v2.webp"],
  },
};

export default function ToolsCatalogPage() {
  // Schema.org Structured Data (CollectionPage & ItemList)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Kyuverse Creator Utility Tools Suite",
    description:
      "Collection of tools and calculators for anime convention creators, artists, and cosplayers.",
    url: "https://www.kyuverse.my.id/tools",
    provider: {
      "@type": "Organization",
      name: "Kyuverse",
      url: "https://www.kyuverse.my.id",
    },
  };

  return (
    <>
      {/* JSON-LD Structured Data Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <Navbar />
      
      {/* Main container dengan dark background eksplisit */}
      <main className="bg-[#0a0a0c] text-white min-h-screen">
        <ToolsCatalogClient />
      </main>

      <Footer />
    </>
  );
}