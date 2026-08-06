'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, Sparkles } from 'lucide-react';

export default function Footer() {
    const bgRef = useRef(null);
    const rafRef = useRef(null);

    useEffect(() => {
        // Disable parallax di mobile
        if (window.innerWidth < 768) return;

        const handleMouseMove = (e) => {
            if (rafRef.current) return;

            rafRef.current = requestAnimationFrame(() => {
                if (bgRef.current) {
                    const x = (e.clientX / window.innerWidth - 0.5) * 15;
                    const y = (e.clientY / window.innerHeight - 0.5) * 15;
                    bgRef.current.style.transform = `translate3d(${-x}px, ${-y}px, 0) scale(1.08)`;
                }
                rafRef.current = null;
            });
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative overflow-hidden bg-[#0a0a0c]">
            {/* ================= BACKGROUND - MATCHING DARK VIBE ================= */}
            <div
                ref={bgRef}
                className="absolute inset-0 z-0 will-change-transform transition-transform duration-500 ease-out"
            >
                <Image
                    src="/footer.webp"
                    alt="Creative footer design for artist and cosplayer portfolio website"
                    fill
                    quality={95}
                    className="object-cover opacity-60"
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent opacity-90" />
            </div>

            {/* Subtle floating shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-1">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-float-delayed" />
            </div>

            {/* Subtle Sparkles */}
            <div className="hidden sm:block absolute top-10 left-10 text-cyan-400/40 animate-pulse">
                <Sparkles className="w-6 h-6" fill="currentColor" />
            </div>
            <div className="hidden sm:block absolute top-20 right-20 text-purple-400/40 animate-bounce">
                <Sparkles className="w-5 h-5" fill="currentColor" />
            </div>

            {/* ================= CONTENT ================= */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-16 sm:pb-20">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

                    {/* Column 1 - About */}
                    <div className="space-y-4">
                        <h3 className="text-xl sm:text-2xl font-black uppercase tracking-[0.25em] bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-purple-500 bg-clip-text text-transparent">
                            Kyuverse
                        </h3>
                        <p className="text-sm text-gray-300 leading-relaxed max-w-xs">
                            Digital ecosystem empowering creators with free utility tools & bespoke web development services.
                        </p>

                        <div className="flex gap-3 pt-1">
                            <a
                                href="https://www.instagram.com/kyuverse.studio/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group bg-white/5 border border-white/10 p-2.5 rounded-xl transition-all duration-300 hover:scale-110 hover:border-purple-400/50 hover:bg-purple-400/10"
                            >
                                <svg className="w-4 h-4 text-white group-hover:text-purple-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Column 2 - Links (Refactored to Next.js App Router Routes) */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-black text-white uppercase tracking-[0.3em] mb-4">
                            Quick Links
                        </h3>
                        <nav aria-label="Footer navigation">
                            <ul className="space-y-3">
                                <li>
                                    <Link
                                        href="/"
                                        className="text-xs sm:text-sm text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-3 group"
                                    >
                                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full group-hover:scale-125 shadow-[0_0_8px_rgba(34,211,238,0.6)] transition-all"></div>
                                        Home Portal
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/tools"
                                        className="text-xs sm:text-sm text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-3 group"
                                    >
                                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full group-hover:scale-125 shadow-[0_0_8px_rgba(59,130,246,0.6)] transition-all"></div>
                                        Utility Tools Catalog
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/service"
                                        className="text-xs sm:text-sm text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-3 group"
                                    >
                                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full group-hover:scale-125 shadow-[0_0_8px_rgba(168,85,247,0.6)] transition-all"></div>
                                        Web Services & Pricing
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    {/* Column 3 - Contact */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-black text-white uppercase tracking-[0.3em] mb-4">
                            Get in Touch
                        </h3>
                        <address className="not-italic space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-400/50 transition-colors">
                                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Email</p>
                                    <a href="mailto:hello@kyuverse.my.id" className="text-sm text-gray-200 hover:text-cyan-400 transition-colors break-all">
                                        hello@kyuverse.my.id
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-400/50 transition-colors">
                                    <Phone className="w-3.5 h-3.5 text-cyan-400" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Phone</p>
                                    <a href="tel:+6285117260321" className="text-sm text-gray-200 hover:text-cyan-400 transition-colors">
                                        +62 851-1726-0321
                                    </a>
                                </div>
                            </div>
                        </address>
                    </div>
                </div>

                {/* Separator Consonant with Hero Stats Border */}
                <div className="h-[1px] bg-white/10 mb-8 rounded-full"></div>

                {/* Footer Bottom */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest text-center">
                        © {currentYear} Kyuverse. All rights reserved.
                    </p>
                    <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest text-center">
                        Creator Utilities & Bespoke Web Studio
                    </p>
                </div>
            </div>

            <style jsx>{`
                @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
                @keyframes float-delayed { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-25px); } }
                @keyframes gradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
                .animate-float { animation: float 6s ease-in-out infinite; }
                .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
                .animate-gradient { background-size: 200% 200%; animation: gradient 4s ease infinite; }
            `}</style>
        </footer>
    );
}