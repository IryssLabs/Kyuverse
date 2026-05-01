'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
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
                    // GPU accelerated transform konsisten dengan Hero, Projects, & WorkWithMe
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
                    src="/footer.png" // Menggunakan aset lo
                    alt="Creative footer design for artist and cosplayer portfolio website"
                    fill
                    quality={95}
                    className="object-cover opacity-60" // Opacity 60% agar gambar 'pop' tapi tetap dark
                    sizes="100vw"
                />
                {/* Overlay konsisten dengan section lainnya */}
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent opacity-90" />
            </div>

            {/* Subtle floating shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-1">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-float-delayed" />
            </div>

            {/* Subtle Sparkles - Opacity diturunkan agar lebih elegan */}
            <div className="hidden sm:block absolute top-10 left-10 text-cyan-400/40 animate-pulse">
                <Sparkles className="w-6 h-6" fill="currentColor" />
            </div>
            <div className="hidden sm:block absolute top-20 right-20 text-purple-400/40 animate-bounce">
                <Sparkles className="w-5 h-5" fill="currentColor" />
            </div>

            {/* ================= CONTENT ================= */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-0 pb-16 sm:pb-20">

              

                {/* Divider tipis setelah maskot */}
                <div className="h-px bg-white/5 mb-12" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

                    {/* Column 1 - About (Font size disesuaikan) */}
                    <div className="space-y-4">
                        <h3 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient tracking-tighter uppercase">
                            Kyuverse
                        </h3>
                        <p className="text-sm text-gray-300 leading-relaxed max-w-xs">
                            Web developer specializing in portfolio websites and commission tools for artists and cosplayers
                        </p>

                        <div className="flex gap-3 pt-2">
                            <a
                                href="https://github.com/kansput"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group bg-white/5 border border-white/10 p-2.5 rounded-xl transition-all duration-300 hover:scale-110 hover:border-cyan-400/50 hover:bg-cyan-400/10"
                            >
                                <svg className="w-4 h-4 text-white group-hover:text-cyan-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </a>
                            <a
                                href="https://www.instagram.com/kandaputrah"
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

                    {/* Column 2 - Links (Font size clean) */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-black text-white uppercase tracking-[0.3em] mb-4">
                            Quick Links
                        </h3>
                        <nav aria-label="Footer navigation">
                            <ul className="space-y-3">
                                <li>
                                    <a
                                        href="#"
                                        onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                        className="text-xs sm:text-sm text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-3 group"
                                    >
                                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full group-hover:scale-125 shadow-[0_0_8px_rgba(34,211,238,0.6)] transition-all"></div>
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#projects"
                                        onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
                                        className="text-xs sm:text-sm text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-3 group"
                                    >
                                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full group-hover:scale-125 shadow-[0_0_8px_rgba(59,130,246,0.6)] transition-all"></div>
                                        Projects
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#pricing"
                                        onClick={(e) => { e.preventDefault(); document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }); }}
                                        className="text-xs sm:text-sm text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-3 group"
                                    >
                                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full group-hover:scale-125 shadow-[0_0_8px_rgba(168,85,247,0.6)] transition-all"></div>
                                        Pricing
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    {/* Column 3 - Contact (Font size minimalis) */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-black text-white uppercase tracking-[0.3em] mb-4">
                            Get in Touch
                        </h3>
                        <address className="not-italic space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-cyan-400/50 transition-colors">
                                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Email</p>
                                    <a href="mailto:kansputt@gmail.com" className="text-sm text-gray-200 hover:text-cyan-400 transition-colors break-all">
                                        hello@kyuverse.my.id
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-cyan-400/50 transition-colors">
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
                        Portfolio & Commission Tools for Artists
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