import './globals.css';
import Navbar from '@/components/Navbar';

// Hapus baris metadataBase yang di luar ini

export const metadata = {
  // Pindahkan ke sini
  metadataBase: new URL('https://www.kyuverse.my.id'),
  title: 'Kyuverse - Creative Web Developer for Artists & Cosplayers',
  description: 'Specialist building portfolio websites, commission platforms, and community spaces for artists, cosplayers, and creative communities.',
  keywords: 'web developer artist, cosplayer website, portfolio artist, commission platform, vtuber site',
  openGraph: {
    title: 'Kyuverse - Creative Web Developer for Artists & Cosplayers',
    description: 'Portfolio websites & commission platforms for creative people.',
    url: 'https://www.kyuverse.my.id',
    siteName: 'Kyuverse',
    images: [
      {
        url: '/og-image.png', // Sekarang ini akan otomatis jadi https://kyuverse.my.id/og-image.png
        width: 1200,
        height: 630,
        alt: 'Kyuverse Portfolio Preview',
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kyuverse - Creative Web Developer for Artists & Cosplayers',
    description: 'Portfolio websites & commission platforms for creative people.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-[#0a0a0c] text-foreground antialiased">

        {/* ── SHARED BACKGROUND LAYER ──────────────────────────────────────
            Fixed di belakang semua section. Blob-blob ini "menembus" scroll,
            kasih kesan depth/3D tanpa Three.js. Zero performance cost.
        ──────────────────────────────────────────────────────────────────── */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">

          {/* Blob utama — cyan, anchor di top-center */}
          <div
            className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full opacity-[0.07]"
            style={{
              background: "radial-gradient(circle, #22d3ee 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />

          {/* Blob kiri tengah — blue */}
          <div
            className="absolute top-[40vh] -left-40 w-[600px] h-[600px] rounded-full opacity-[0.05]"
            style={{
              background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)",
              filter: "blur(90px)",
            }}
          />

          {/* Blob kanan tengah — purple */}
          <div
            className="absolute top-[70vh] -right-40 w-[500px] h-[500px] rounded-full opacity-[0.06]"
            style={{
              background: "radial-gradient(circle, #a855f7 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />

          {/* Blob bawah — cyan lagi, buat closing loop */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full opacity-[0.05]"
            style={{
              background: "radial-gradient(circle, #22d3ee 0%, transparent 70%)",
              filter: "blur(100px)",
            }}
          />

          {/* Grid texture global — sangat subtle */}
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
      </body>
    </html>
  );
}