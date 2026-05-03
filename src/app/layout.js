import './globals.css';
import Navbar from '@/components/Navbar';
import Script from 'next/script';

export const metadata = {
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
        url: 'https://www.kyuverse.my.id/og-image.png',
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
    images: ['https://www.kyuverse.my.id/og-image.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-0GZ6LJSJ70"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0GZ6LJSJ70');
          `}
        </Script>
      </head>
      <body className="bg-[#0a0a0c] text-foreground antialiased">

        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full opacity-[0.07]"
            style={{
              background: "radial-gradient(circle, #22d3ee 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />
          <div
            className="absolute top-[40vh] -left-40 w-[600px] h-[600px] rounded-full opacity-[0.05]"
            style={{
              background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)",
              filter: "blur(90px)",
            }}
          />
          <div
            className="absolute top-[70vh] -right-40 w-[500px] h-[500px] rounded-full opacity-[0.06]"
            style={{
              background: "radial-gradient(circle, #a855f7 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full opacity-[0.05]"
            style={{
              background: "radial-gradient(circle, #22d3ee 0%, transparent 70%)",
              filter: "blur(100px)",
            }}
          />
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